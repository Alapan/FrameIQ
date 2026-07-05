The project uses a Next.js (React) frontend, an Express (Node.js + TypeScript) signer service, and Google Cloud Storage for secure direct-to-cloud image uploads using signed URLs. During local development, authentication is handled via Google Cloud IAM and Application Default Credentials (ADC).

The system is designed to be extended with Cloud Run-based image processing services and Cloud SQL for storing image metadata. In future iterations, uploaded images will be processed using AI to extract insights and generate structured information, which will then be displayed in the frontend.

## Prerequisites

Install:

1. Node.js (LTS)
2. Google Cloud CLI: https://cloud.google.com/sdk/docs/install
3. A GCP project with billing enabled

## Google Cloud setup

1. gcloud config set project <YOUR_PROJECT_ID>

### Enable required APIs:

1. gcloud services enable storage.googleapis.com
2. gcloud services enable iamcredentials.googleapis.com

### Create Cloud Storage bucket

1. gcloud storage buckets create gs://<BUCKET_NAME> --location=us-central1

(or manually through Cloud Console)

### Service Account creation

1. gcloud iam service-accounts create signer-sa

### Grant permissions to bucket

1. gcloud storage buckets add-iam-policy-binding gs://<BUCKET_NAME> \
  --member="serviceAccount:signer-sa@<PROJECT_ID>.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

### Allow service account to sign URLs
1. gcloud iam service-accounts add-iam-policy-binding signer-sa@<PROJECT_ID>.iam.gserviceaccount.com \
  --member="user:<YOUR_EMAIL>" \
  --role="roles/iam.serviceAccountTokenCreator"

## Authenticate locally
1. gcloud auth login
2. gcloud auth application-default login --impersonate-service-account=signer-sa@<PROJECT_ID>.iam.gserviceaccount.com

## Configure CORS
In signed-url-generator, run

```bash
gcloud storage buckets update gs://image-iq-bucket --cors-file=cors.json
```
## Getting Started

1. Create .env.local in frontend/ folder and .env in signed-url-generator/ folder. Copy the values from the sample env files in the respective folders.

2. Run the development server for frontend:

```bash
cd frontend
npm install (first time only)
npm run dev

```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In a separate terminal, run:

```bash
cd signed-url-generator

npm install (first time only)
npm run start
```

## Current flow

1. User selects file in frontend.
2. Frontend requests signed URL from signed URL generator service.
3. The generator service responds with the URL.
3. Frontend makes a PUT request to the created GCS bucket using the URL.
