import { useEffect, useState, useId, useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';

import { IFiles } from '@/utils/Types';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { uploadPostFile, showPostFile } from '@/store/s3Slice';
import Navbar from '@/components/UI/Navbar';
import CardImage from '@/components/CardImage';
import Hero from '@/components/Hero';
import Footer from '@/components/UI/Footer';
import Table from '@/components/Table';

const Home: NextPage = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.s3.data);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File[]>([]);
  const [uploadingStatus, setUploadingStatus] = useState<string>('');
  const [fileKey, setFileKey] = useState<string[]>([]);

  const onChangeMultipleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setFile(files);
    }
  };

  const handleOpenFileInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
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
    setUploadingStatus('');
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <main className="container mx-auto max-w-screen-md px-2 overflow-hidden">
        <div className="my-3">
          <input
            type="file"
            name="file"
            accept="image/*"
            className="hidden"
            multiple
            onChange={onChangeMultipleImage}
            ref={inputFileRef}
          />
          <div
            onClick={handleOpenFileInput}
            className="w-full flex justify-center items-center rounded-md border-2 border-dashed border-purple-400 mb-3 cursor-pointer hover:border-purple-800 group"
          >
            {file.length > 0 ? (
              <div className="my-6">
                {file.map((f) => (
                  <div key={f.name} className="flex items-center space-x-2">
                    <div className="text-sm text-gray-600">{f.name}</div>
                  </div>
                ))}
                {uploadingStatus && <p className="my-2 text-lg font-medium text-purple-500">{uploadingStatus}</p>}
              </div>
            ) : (
              <div className="my-5 flex flex-col items-center">
                <CloudArrowUpIcon className="h-20 w-20 text-purple-500 group-hover:text-purple-800" />
                <p>Select single or multiple images</p>
              </div>
            )}
          </div>
          <button
            onClick={uploadFile}
            className=" bg-purple-500 text-white p-2 rounded-md w-full shadow-md hover:bg-purple-700 transition-all"
          >
            Upload a File!
          </button>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold mb-2 border-b-2 border-purple-500">Thumbnail</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.length > 0 ? (
              data.map((item: string) => <CardImage key={id + item} url={item} />)
            ) : (
              <div className="text-center text-gray-500 font-medium col-span-4">No image uploaded</div>
            )}
          </div>
        </div>
        <Table data={data} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
