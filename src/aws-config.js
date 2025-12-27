// AWS Amplify Configuration - Wealthnomics
// Cognito User Pool: wealthnomics-web

const awsConfig = {
    Auth: {
        Cognito: {
            // Your Cognito User Pool ID
            userPoolId: 'us-east-1_2XheAw5TJ',
            // Your Cognito App Client ID
            userPoolClientId: '77co8mmq2b76fh7jej2q6oii4d',
            // Login mechanisms
            loginWith: {
                email: true,
                username: false
            },
            signUpVerificationMethod: 'code',
            userAttributes: {
                email: {
                    required: true
                },
                name: {
                    required: true
                }
            },
            passwordFormat: {
                minLength: 8,
                requireLowercase: true,
                requireUppercase: true,
                requireNumbers: true,
                requireSpecialCharacters: false
            }
        }
    }
}

export default awsConfig
