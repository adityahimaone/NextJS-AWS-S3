import { NextApiRequest, NextApiResponse } from 'next';
import clientS3 from '@/services/clientS3';
import { IParams } from '@/utils/Types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { key } = req.body;
  try {
    const fileParams = key.map((key: string) => {
      const params: IParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: key,
      };
      return params;
    });
    const result = await Promise.all(
      fileParams.map((params: IParams) => clientS3.getSignedUrlPromise('getObject', params)),
    );
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
