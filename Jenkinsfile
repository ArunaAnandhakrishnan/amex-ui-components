pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        SONAR_HOST_URL = 'http://localhost:9000'
        // Format: 'folder-name:sonar-project-key'
        PROJECTS = 'shell:amex-shell bta-portal:amex-bta-portal offers-portal:amex-offers-portal pay-with-points-portal:amex-pay-with-points supplementary-portal:amex-supplementary-portal wearables-portal:amex-wearables-portal'
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
                reportDir: 'offers-portal/coverage/offers-portal', reportFiles: 'index.html',
                reportName: 'Offers Portal Coverage'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir: 'pay-with-points-portal/coverage/pay-with-points-portal', reportFiles: 'index.html',
                reportName: 'Pay With Points Coverage'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir: 'supplementary-portal/coverage/supplementary-portal', reportFiles: 'index.html',
                reportName: 'Supplementary Portal Coverage'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir: 'wearables-portal/coverage/wearables-portal', reportFiles: 'index.html',
                reportName: 'Wearables Portal Coverage'
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
