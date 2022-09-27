import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import formidable from "formidable";
import fs from "fs";
import clientS3 from "@/services/clientS3";

const BucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    let { name, type } = req.body;
    console.log(name, type, "path");
    const fileParams = {
      Bucket: BucketName,
      Key: name,
      ContentType: type,
    };
    const url = await clientS3.getSignedUrlPromise("putObject", fileParams);
    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }

  //   const form = formidable({ multiples: true });
  //   form.parse(req, async (err, fields, files) => {
  //     if (!files.file) {
  //       return res.status(400).json({ error: "No file uploaded" });
  //     }
  //     const { file } = files;
  //     try {
  //       return clientS3.putObject(
  //         {
  //           Bucket: BucketName,
  //           Key: "test",
  //           Body: fs.createReadStream(file?.filepath),
  //           ACL: "public-read",
  //         },
  //         async () => res.status(201).send("File uploaded successfully")
  //       );
  //     } catch (err) {
  //       return res.status(500).send(err);
  //     }
  //   });
};
