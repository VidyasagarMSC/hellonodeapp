node {
  stage('build & deploy') {
    openshiftBuild bldCfg: 'hellonodeapp',
      namespace: 'development',
      showBuildLogs: 'true'
    openshiftVerifyDeployment depCfg: 'hellonodeapp',
      namespace: 'development'
  }
  stage('approval (test)') {
    input message: 'Approve for testing?',
      id: 'approval'
  }
  stage('deploy to test') {
    openshiftTag srcStream: 'hellonodeapp',
      namespace: 'development',
      srcTag: 'latest',
      destinationNamespace: 'testing',
      destStream: 'hellonodeapp',
      destTag: 'test'
    openshiftVerifyDeployment depCfg: 'hellonodeapp',
      namespace: 'testing'
  }
  stage('approval (production)') {
    input message: 'Approve for production?',
      id: 'approval'
  }
  stage('deploy to production') {
    openshiftTag srcStream: 'hellonodeapp',
      namespace: 'development',
      srcTag: 'latest',
      destinationNamespace: 'production',
      destStream: 'hellonodeapp',
      destTag: 'prod'
    openshiftVerifyDeployment depCfg: 'hellonodeapp',
      namespace: 'production'
  }
}