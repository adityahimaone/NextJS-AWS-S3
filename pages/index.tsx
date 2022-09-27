import { useEffect, useState, useId } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";

const BUCKET_URL = process.env.NEXT_PUBLIC_S3_CDN_URL
  ? process.env.NEXT_PUBLIC_S3_CDN_URL
  : "";

const Home: NextPage = () => {
  const id = useId();

  const [file, setFile] = useState<File[]>([]);
  const [uploadingStatus, setUploadingStatus] = useState<string>("");
  const [fileKey, setFileKey] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string[]>([]);

  const onChangeMultipleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setFile(files);
    }
  };

  const showImg = async () => {
    const res = await axios.post("/api/s3/show", {
      key: fileKey,
    });
    setUploadedFile(res.data.result);
  };

  useEffect(() => {
    if (!fileKey) return;
    showImg();
  }, [fileKey]);

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let files = file.map((f) => {
      return {
        name: f.name,
        type: f.type,
      };
    });

    let { data } = await axios.post("/api/s3/upload", {
      files,
    });

    console.log(data);
    const result = data.result;
    console.log(result);

    let uploadPromises = result.map(async (url: string, index: number) => {
      console.log(url, index, "url");
      const options = {
        headers: {
          "Content-Type": file[index].type,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const { data } = await axios.put(url, file[index], options);
      setUploadingStatus("File uploaded successfully");
    });

    await Promise.all(uploadPromises);

    setFileKey(file.map((f) => f.name));
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
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>
        <div>
          {uploadingStatus && <p>{uploadingStatus}</p>}
          {uploadedFile &&
            uploadedFile.map((item: string) => (
              <img key={id + item} src={item} alt={item} />
            ))}
        </div>
        <div>
          <input
            type="file"
            name="file"
            accept="image/*"
            multiple
            onChange={onChangeMultipleImage}
          />
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
