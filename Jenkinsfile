pipeline {
    agent any
    tools {
        nodejs("node_test")
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}