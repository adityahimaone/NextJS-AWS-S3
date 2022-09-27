import React from 'react';

function Hero(): JSX.Element {
  return (
    <div
      style={{
        backgroundImage: `url('./images/bg.jpg')`,
      }}
      className=" py-40 bg-black bg-cover bg-center"
    >
      <div className="container mx-auto max-w-screen-md">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-xl md:text-3xl text-white font-semibold">Let's upload your photo in AWS S3</h1>
          <p className="text-base text-white">select single or multiple photo</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
