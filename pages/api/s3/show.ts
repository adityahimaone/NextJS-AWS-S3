import { NextApiRequest, NextApiResponse } from "next";
import clientS3 from "@/services/clientS3";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { key } = req.body;
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: key,
    };
    const url = await clientS3.getSignedUrlPromise("getObject", params);
    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
