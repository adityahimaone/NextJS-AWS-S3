import { useEffect, useState, useId } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { IFiles } from '@/utils/Types';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { uploadPostFile, showPostFile } from '@/store/s3Slice';

const Home: NextPage = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.s3.data);

  const [file, setFile] = useState<File[]>([]);
  const [uploadingStatus, setUploadingStatus] = useState<string>('');
  const [fileKey, setFileKey] = useState<string[]>([]);

  const onChangeMultipleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setFile(files);
    }
  };

  useEffect(() => {
    if (fileKey.length <= 0) return;
    dispatch(showPostFile(fileKey));
  }, [fileKey]);

  const uploadFile = async () => {
    setUploadingStatus('Uploading the file to AWS S3');

    let files: IFiles[] = file.map((f) => {
      return {
        name: f.name,
        type: f.type,
      };
    });
    const result = await dispatch(uploadPostFile(files));
    if (uploadPostFile.fulfilled.match(result)) {
      setFileKey(file.map((f) => f.name));
      setUploadingStatus('File uploaded successfully');
    }
    setFile([]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>
        <div>
          {uploadingStatus && <p>{uploadingStatus}</p>}
          {data && data.map((item: string) => <img key={id + item} src={item} alt={item} />)}
        </div>
        <div>
          <input type="file" name="file" accept="image/*" multiple onChange={onChangeMultipleImage} />
          <button
            onClick={uploadFile}
            className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
          >
            Upload a File!
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
