pipeline {
  agent any
  stages {
    stage('preamble') {
      steps {
        script {
          sh 'oc new-project development'
          sh 'oc new-project testing'
          sh 'oc new-project production'
          openshift.withCluster() {
            openshift.withProject() {
              echo "Using project: ${openshift.project()}"
            }
          }
        }
      }
    }

    stage('build') {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject('development') {
              // NOTE: the selector returned when -F/--follow is supplied to startBuild()
              // will be inoperative for the various selector operations.
              // Consider removing those options from startBuild and using the logs()
              // command to follow the build output.
              openshift.selector('bc', 'hellonodeapp').startBuild('--follow', '--wait')
            }
          }
        }
      }
    }

    stage('approval (testing)') {
      steps {
        script {
          input message: 'Approve for testing?', id: 'approval'
        }
      }
    }

    stage('deploy to testing') {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject('development') {
              openshift.tag('hellonodeapp:latest', 'testing/hellonodeapp:test')
            }
          }
        }
      }
    }

    stage('approval (production)') {
      steps {
        script {
          input message: 'Approve for production?', id: 'approval'
        }
      }
    }

    stage('deploy to production') {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject('testing') {
              openshift.tag('hellonodeapp:test', 'production/hellonodeapp:prod')
            }
          }
        }
      }
    }
  }
}
