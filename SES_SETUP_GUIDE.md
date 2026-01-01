# AWS SES Setup Guide for Newsletter

Follow these steps to enable your newsletter subscription via AWS SES.

## Step 1: Verify Your Email in AWS SES
1.  Log in to the **AWS Management Console**.
2.  Navigate to **Amazon SES**.
3.  In the left sidebar, click **Verified Identities**.
4.  Click **Create identity**.
5.  Select **Email address** and enter: `ayushman@wealthnomic.com`
6.  Click **Create identity**.
7.  Check that email's inbox and click the verification link sent by AWS.

## Step 2: Create an IAM User for the Website
1.  Go to the **IAM** service in AWS Console.
2.  Click **Users** -> **Create user**.
3.  **User name**: `wealthnomic-ses-sender`.
4.  Click **Next**.
5.  Select **Attach policies directly**.
6.  Search for and select **AmazonSESFullAccess** (or create a custom policy with `ses:SendEmail`).
7.  Click **Next** -> **Create user**.
8.  Click on the newly created user name.
9.  Go to the **Security credentials** tab.
10. Scroll down to **Access keys** and click **Create access key**.
11. Select **Application running outside AWS**.
12. Click **Next** -> **Create access key**.
13. **IMPORTANT**: Copy the **Access Key ID** and **Secret Access Key**. You won't see them again!

## Step 3: Configure Environment Variables
In your project's local environment (or your hosting provider like Amplify/Vercel), set the following environment variables:

```bash
VITE_AWS_ACCESS_KEY_ID=your_access_key_id
VITE_AWS_SECRET_ACCESS_KEY=your_secret_access_key
VITE_AWS_REGION=us-east-1
```

## Step 4: Test the Integration
1.  Restart your development server: `npm run dev`.
2.  Submit an email in the Newsletter popup.
3.  You (the verified sender) will receive an email notifying you of the new subscriber!

> [!NOTE]
> By default, new SES accounts are in the **Sandbox**. This means you can only send emails TO verified addresses. To send confirmation emails to subscribers, you will need to request "Production Access" in the SES dashboard.
