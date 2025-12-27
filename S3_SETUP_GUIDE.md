# S3 Setup Guide for Simulation Dashboard

Follow these steps to set up an AWS S3 bucket to host your simulation data.

## Step 1: Create an S3 Bucket
1.  Log in to the **AWS Console**.
2.  Go to **S3** service.
3.  Click **Create bucket**.
4.  **Bucket name**: Choose a unique name (e.g., `wealthnomic-simulation-data`).
5.  **Region**: Choose `US East (N. Virginia) us-east-1`.
6.  **Block Public Access settings**:
    - Uncheck **"Block all public access"**.
    - Check the warning box acknowledging that objects can be public.
    - *Note: This is the simplest way for a public dashboard. For private data, we would need a more complex presigned URL setup.*
7.  Click **Create bucket**.

## Step 2: Configure CORS (Cross-Origin Resource Sharing)
This is critical. It allows your website to "fetch" data from S3.

1.  Click on your newly created bucket.
2.  Go to the **Permissions** tab.
3.  Scroll down to **Cross-origin resource sharing (CORS)**.
4.  Click **Edit** and paste this JSON:
    ```json
    [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "HEAD"],
            "AllowedOrigins": ["*"],
            "ExposeHeaders": []
        }
    ]
    ```
    *(Note: For production security, change `AllowedOrigins` from `"*"` to your specific domain, e.g., `["https://your-website.com"]`)*.
5.  Click **Save changes**.

## Step 3: Upload Data
1.  Go to the **Objects** tab.
2.  Click **Upload**.
3.  Select your `simulation_data.json` file.
4.  Click **Upload**.

## Step 4: Make the File Public
1.  Click on the uploaded `simulation_data.json` file name to open its details.
2.  Click the **Permissions** tab (or "Object Actions" > "Make public using ACL").
    - *If "Make public using ACL" is disabled, you might need to edit the Bucket Policy instead.*
    
    **Alternative (Bucket Policy method - Recommended):**
    - Go to **Bucket > Permissions > Bucket policy**.
    - Click **Edit** and paste:
      ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "PublicReadGetObject",
                  "Effect": "Allow",
                  "Principal": "*",
                  "Action": "s3:GetObject",
                  "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
              }
          ]
      }
      ```
      *(Replace YOUR-BUCKET-NAME with your actual bucket name)*

## Step 5: Get the URL
1.  Click on the `simulation_data.json` file in S3.
2.  Copy the **Object URL** (usually looks like `https://bucket-name.s3.region.amazonaws.com/simulation_data.json`).
3.  **Provide this URL** to me so I can update the app code.
