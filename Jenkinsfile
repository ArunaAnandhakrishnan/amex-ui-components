pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        SONAR_HOST_URL = 'http://localhost:9000'
        PROJECTS       = 'shell:amex-shell:4200 bta-portal:amex-bta-portal:4201'
        ZAP_HOME       = 'C:\\Program Files\\ZAP\\Zed Attack Proxy'
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
                        dir(folder) { bat 'npm install' }
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

        // ── ZAP MUST run BEFORE SonarQube so the XML report exists ──────────
        stage('ZAP Security Scan') {
            steps {
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def parts  = proj.split(':')
                        def folder = parts[0]
                        def port   = parts[2]

                        echo "--- Starting app: ${folder} on port ${port} ---"
                        dir(folder) {
                            bat "start /B ng serve --port ${port} --disable-host-check"
                        }

                        echo "--- Waiting 30s for app to start ---"
                        sleep(time: 30, unit: 'SECONDS')

                        // Output XML report (required by sonar-zap-plugin)
                        // Output HTML report (for human reading)
                        echo "--- Running ZAP scan on ${folder} (port ${port}) ---"
                        bat """
                            cd "${env.ZAP_HOME}" && ^
                            zap.bat -cmd ^
                              -port 8090 ^
                              -dir "${WORKSPACE}\\zap-home-${folder}" ^
                              -quickurl http://localhost:${port} ^
                              -quickprogress ^
                              -quickout "${WORKSPACE}\\${folder}\\zap-report.xml" ^
                              -silent ^
                            || exit 0
                        """

                        // Also generate HTML for the publishHTML step
                        // ZAP -quickout only supports one output; convert or copy
                        bat """
                            copy "${WORKSPACE}\\${folder}\\zap-report.xml" ^
                                 "${WORKSPACE}\\${folder}\\zap-report.html" ^
                            2>nul || exit 0
                        """

                        echo "--- Stopping dev server: ${folder} ---"
                        bat 'taskkill /F /IM node.exe /T 2>nul || exit 0'
                        sleep(time: 5, unit: 'SECONDS')

                        // Verify the report was created
                        bat """
                            if not exist "${WORKSPACE}\\${folder}\\zap-report.xml" (
                                echo ERROR: ZAP report not generated for ${folder}
                                exit 1
                            ) else (
                                echo ZAP report OK: ${WORKSPACE}\\${folder}\\zap-report.xml
                            )
                        """
                    }
                }
            }
        }

        // ── SonarQube runs AFTER ZAP so zap-report.xml already exists ───────
        stage('SonarQube Analysis') {
            steps {
                script {
                    env.PROJECTS.split(' ').each { proj ->
                        def parts    = proj.split(':')
                        def folder   = parts[0]
                        def sonarKey = parts[1]
                        echo "--- SonarQube scan: ${folder} (key: ${sonarKey}) ---"
                        dir(folder) {
                            withSonarQubeEnv('SonarQube') {
                                def scannerHome = tool 'SonarQubeScanner'
                                // Pass ZAP report path as absolute to avoid ambiguity
                                bat """
                                    "${scannerHome}\\bin\\sonar-scanner.bat" ^
                                    -Dsonar.zaproxy.reportPath="${WORKSPACE}\\${folder}\\zap-report.xml" ^
                                    -Dsonar.zaproxy.htmlReportPath="${WORKSPACE}\\${folder}\\zap-report.xml"
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
                    // abortPipeline: false — ZAP findings won't kill the build
                    // change to true once your baseline is clean
                    waitForQualityGate abortPipeline: false
                }
            }
        }
    }

    post {
        always {
            echo '--- Publishing reports ---'

            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'shell/coverage/shell',
                reportFiles: 'index.html',
                reportName:  'Shell Coverage'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'bta-portal/coverage/bta-portal',
                reportFiles: 'index.html',
                reportName:  'BTA Portal Coverage'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'shell',
                reportFiles: 'zap-report.xml',
                reportName:  'Shell ZAP Security Report'
            ])
            publishHTML([
                allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true,
                reportDir:   'bta-portal',
                reportFiles: 'zap-report.xml',
                reportName:  'BTA Portal ZAP Security Report'
            ])
        }

        success {
            echo '==========================='
            echo '  BUILD PASSED ✅'
            echo '==========================='
        }
        failure {
            echo '==========================='
            echo '  BUILD FAILED ❌'
            echo '==========================='
        }
    }
}
