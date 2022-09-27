import S3 from "aws-sdk/clients/s3";

const clientS3 = new S3({
  region: process.env.REACT_APP_S3_BUCKET_REGION,
  endpoint: process.env.NEXT_PUBLIC_S3_BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_BUCKET_KEY
      ? process.env.NEXT_PUBLIC_S3_BUCKET_KEY
      : "",
    secretAccessKey: process.env.NEXT_PUBLIC_S3_BUCKET_SECRET
      ? process.env.NEXT_PUBLIC_S3_BUCKET_SECRET
      : "",
  },
  signatureVersion: "v4",
});

export default clientS3;
