// AWS Amplify Configuration
// Replace these values with your actual Cognito User Pool settings after creating them in AWS Console

const awsConfig = {
    Auth: {
        Cognito: {
            // REPLACE WITH YOUR COGNITO USER POOL ID
            userPoolId: 'us-east-1_XXXXXXXXX',
            // REPLACE WITH YOUR COGNITO USER POOL CLIENT ID
            userPoolClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
            // Login mechanisms
            loginWith: {
                email: true,
                username: false
            },
            signUpVerificationMethod: 'code',
            userAttributes: {
                email: {
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

/*
SETUP INSTRUCTIONS:

1. Go to AWS Console > Cognito > User Pools > Create User Pool
2. Choose "Email" as sign-in option
3. Keep default password policy or customize
4. Enable self-registration
5. Choose "Send email with Cognito" for email delivery
6. Name your user pool (e.g., "wealthnomics-users")
7. Create an app client (choose "Public client")
8. Copy the User Pool ID and Client ID to this file
9. Rebuild and deploy

AWS Cognito Free Tier:
- 50,000 Monthly Active Users (MAU) FREE
- Pay-as-you-go after that: $0.0055/MAU

That means for most startups, authentication is essentially FREE!
*/
