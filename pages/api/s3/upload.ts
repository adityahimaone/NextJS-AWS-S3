import { NextApiRequest, NextApiResponse } from 'next';
import clientS3 from '@/services/clientS3';
import { IParamsUpload } from '@/utils/Types';

const BucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const { files } = req.body;
    const fileParams = files.map((file: { name: string; type: string }) => {
      const { name, type } = file;
      const params: IParamsUpload = {
        Bucket: BucketName,
        Key: name,
        ContentType: type,
      };
      return params;
    });

    const result = await Promise.all(
      fileParams.map((params: IParamsUpload) => clientS3.getSignedUrlPromise('putObject', params)),
    );

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
