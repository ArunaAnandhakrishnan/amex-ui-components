pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
        maven  'MAVEN_HOME'
    }

    environment {
        SONAR_HOST_URL = 'http://localhost:9000'

        PROJECTS = 'shell:amex-shell:4200 bta-portal:amex-bta-portal:4201'

        ZAP_EXE = 'C:\\Program Files\\ZAP\\Zed Attack Proxy\\zap.bat'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '==========================='
                echo '  Checking out code...'
                echo '==========================='

                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {

                script {

                    env.PROJECTS.split(' ').each { proj ->

                        def folder = proj.split(':')[0]

                        echo "--- npm install: ${folder} ---"

                        dir(folder) {

                            bat 'npm install'

                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {

                script {

                    env.PROJECTS.split(' ').each { proj ->

                        def folder = proj.split(':')[0]

                        echo "--- Building: ${folder} ---"

                        dir(folder) {

                            bat 'npm run build -- --configuration production'

                        }
                    }
                }
            }
        }

        stage('Test & Coverage') {
            steps {

                script {

                    env.PROJECTS.split(' ').each { proj ->

                        def folder = proj.split(':')[0]

                        echo "--- Testing: ${folder} ---"

                        dir(folder) {

                            bat 'ng test --code-coverage --watch=false --browsers=ChromeHeadlessCI'

                        }
                    }
                }
            }
        }

        stage('ZAP Security Scan') {
            steps {

                script {

                    env.PROJECTS.split(' ').each { proj ->

                        def parts     = proj.split(':')
                        def folder    = parts[0]
                        def port      = parts[2]

                        def zapDir    = "${WORKSPACE}\\zap-home-${folder}"
                        def zapReport = "${WORKSPACE}\\${folder}\\zap-report.html"

                        echo "--- Starting app: ${folder} on port ${port} ---"

                        dir(folder) {

                            bat "start /B ng serve --port ${port} --disable-host-check"

                        }

                        echo "--- Waiting 30s for app to start ---"

                        sleep(time: 30, unit: 'SECONDS')

                        echo "--- Running ZAP scan on ${folder} ---"

                        bat """
                        cd "C:\\Program Files\\ZAP\\Zed Attack Proxy"
                        zap.bat -cmd -port 8090 ^
                        -dir "${zapDir}" ^
                        -quickurl http://localhost:${port} ^
                        -quickprogress ^
                        -quickout "${zapReport}" ^
                        -silent || exit 0
                        """

                        echo "--- Stopping node process ---"

                        bat 'taskkill /F /IM node.exe /T 2>nul || exit 0'

                        sleep(time: 5, unit: 'SECONDS')
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {

                script {

                    env.PROJECTS.split(' ').each { proj ->

                        def parts      = proj.split(':')
                        def folder     = parts[0]
                        def sonarKey   = parts[1]

                        def zapReport  = "${WORKSPACE}\\${folder}\\zap-report.html"

                        echo "--- SonarQube scan: ${folder} ---"

                        dir(folder) {

                            withSonarQubeEnv('SonarQube') {

                                def scannerHome = tool 'SonarQubeScanner'

                                bat """
                                "${scannerHome}\\bin\\sonar-scanner.bat" ^
                                -Dsonar.zaproxy.reportPath="${zapReport}" ^
                                -Dsonar.zaproxy.htmlReportPath="${zapReport}"
                                """
                            }
                        }
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {

                echo '--- Waiting for SonarQube Quality Gate result ---'

                timeout(time: 5, unit: 'MINUTES') {

                    waitForQualityGate abortPipeline: false

                }
            }
        }

        stage('Automation Testing') {
            steps {

                echo '==========================='
                echo ' Running Automation Tests '
                echo '==========================='

                dir('CucumberFramwork') {

                    bat 'mvn clean test -Dcucumber.filter.tags="@Sanity"'

                }
            }
        }

        stage('Deployment') {
            steps {

                echo '==========================='
                echo ' Deploying Applications '
                echo '==========================='

                echo 'Deployment logic goes here'

            }
        }
    }

    post {

        always {

            echo '--- Publishing reports ---'

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'shell/coverage/shell',
                reportFiles: 'index.html',
                reportName: 'Shell Coverage'
            ])

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'bta-portal/coverage/bta-portal',
                reportFiles: 'index.html',
                reportName: 'BTA Portal Coverage'
            ])

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'shell',
                reportFiles: 'zap-report.html',
                reportName: 'Shell ZAP Security Report'
            ])

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'bta-portal',
                reportFiles: 'zap-report.html',
                reportName: 'BTA Portal ZAP Security Report'
            ])

            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'CucumberFramwork/allure-results']]
            ])
        }

        success {

            echo '==========================='
            echo ' BUILD PASSED ✅ '
            echo '==========================='
        }

        failure {

            echo '==========================='
            echo ' BUILD FAILED ❌ '
            echo '==========================='
        }
    }
}
