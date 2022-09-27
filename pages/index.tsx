import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";

const BUCKET_URL = process.env.NEXT_PUBLIC_S3_CDN_URL
  ? process.env.NEXT_PUBLIC_S3_CDN_URL
  : "";

const Home: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingStatus, setUploadingStatus] = useState<string>("");
  const [fileKey, setFileKey] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<string>("");

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const showImg = async () => {
    const res = await axios.post("/api/s3/show", {
      key: fileKey,
    });
    setUploadedFile(res.data.url);
  };

  useEffect(() => {
    if (!fileKey) return;
    showImg();
  }, [fileKey]);

  console.log("uploadedFile", uploadedFile);

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/upload", {
      name: selectedFile?.name,
      type: selectedFile?.type,
    });

    console.log(data);
    const url = data.url;

    let { data: newData } = await axios.put(url, selectedFile, {
      headers: {
        "Content-type": selectedFile?.type ? selectedFile.type : "",
        "Access-Control-Allow-Origin": "*",
      },
    });

    console.log(newData, "data");
    setFileKey(selectedFile?.name ? selectedFile?.name : "");

    // setUploadedFile(BUCKET_URL + selectedFile?.name);
    console.log(uploadedFile);
    // setUploadedFile(url);
    setSelectedFile(null);
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
          {uploadedFile && <img src={uploadedFile} />}
        </div>
        <div>
          <input type="file" name="file" multiple onChange={onChangeImage} />
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
