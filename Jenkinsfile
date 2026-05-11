pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        SONAR_HOST_URL = 'http://localhost:9000'
        PROJECTS = 'shell:amex-shell bta-portal:amex-bta-portal'
        ZAP_PATH = 'C:\\Program Files\\ZAP\\Zed Attack Proxy\\zap.bat'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '==============================='
                echo '  Checking out latest code...'
                echo '==============================='
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def projects = env.PROJECTS.split(' ')
                    projects.each { proj ->
                        def parts  = proj.split(':')
                        def folder = parts[0]
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
                    def projects = env.PROJECTS.split(' ')
                    projects.each { proj ->
                        def parts  = proj.split(':')
                        def folder = parts[0]
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
                    def projects = env.PROJECTS.split(' ')
                    projects.each { proj ->
                        def parts  = proj.split(':')
                        def folder = parts[0]
                        echo "--- Testing: ${folder} ---"
                        dir(folder) {
                            bat 'ng test --code-coverage --watch=false --browsers=ChromeHeadlessCI'
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def projects = env.PROJECTS.split(' ')
                    projects.each { proj ->
                        def parts    = proj.split(':')
                        def folder   = parts[0]
                        def sonarKey = parts[1]
                        echo "--- SonarQube scan: ${folder} ---"
                        dir(folder) {
                            withSonarQubeEnv('SonarQube') {
                                def scannerHome = tool 'SonarQubeScanner'
                                bat "${scannerHome}\\bin\\sonar-scanner.bat"
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
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('ZAP Security Scan') {
            steps {
                script {
                    def zapPath = env.ZAP_PATH
                    def ports = ['shell': '4200', 'bta-portal': '4201']
                    def projects = env.PROJECTS.split(' ')
                    projects.each { proj ->
                        def parts  = proj.split(':')
                        def folder = parts[0]
                        def port   = ports[folder]
                        echo "--- Starting app: ${folder} on port ${port} ---"
                        dir(folder) {
                            bat "start /B node ./node_modules/@angular/cli/bin/ng serve --port ${port} --disable-host-check"
                        }
                        echo "--- Waiting for app to start ---"
                        sleep(time: 25, unit: 'SECONDS')
                        echo "--- Running ZAP scan on ${folder} ---"
                        bat "cd \"C:\\Program Files\\ZAP\\Zed Attack Proxy\" && zap.bat -cmd -port 8090 -dir \"${WORKSPACE}\\zap-home\" -quickurl http://localhost:${port} -quickprogress -quickout \"${WORKSPACE}\\${folder}\\zap-report.html\" -silent"
                        echo "--- Stopping app: ${folder} ---"
                        bat 'taskkill /F /IM node.exe /T 2>nul || exit 0'
                        sleep(time: 5, unit: 'SECONDS')
                    }
                }
            }
        }

    }

    post {
        always {
            echo '--- Publishing coverage reports ---'
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir: 'shell/coverage/shell', reportFiles: 'index.html',
                reportName: 'Shell Coverage'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir: 'bta-portal/coverage/bta-portal', reportFiles: 'index.html',
                reportName: 'BTA Portal Coverage'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir: 'shell', reportFiles: 'zap-report.html',
                reportName: 'Shell ZAP Security Report'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir: 'bta-portal', reportFiles: 'zap-report.html',
                reportName: 'BTA Portal ZAP Security Report'
            ])
        }
        success {
            echo '==============================='
            echo '  BUILD PASSED ✅'
            echo '  All Quality Gates passed!'
            echo '==============================='
        }
        failure {
            echo '==============================='
            echo '  BUILD FAILED ❌'
            echo '  Check SonarQube Quality Gate'
            echo '  or build/test errors above'
            echo '==============================='
        }
    }
}
