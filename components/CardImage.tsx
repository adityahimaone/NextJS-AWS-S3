import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DocumentDuplicateIcon } from '@heroicons/react/24/solid';

interface ICardImage {
  url: string;
}

function CardImage({ url }: ICardImage): JSX.Element {
  return (
    <div className="bg-white shadow-md rounded-md p-2 relative">
      <img src={url} alt="image" className="h-40 w-auto object-contain object-center" />
      <div className="absolute bottom-0 right-0 p-2 group">
        <CopyToClipboard text={url}>
          <button className="bg-purple-500 text-white p-2 rounded-md w-full shadow-md hover:bg-purple-700 transition-all">
            <DocumentDuplicateIcon className="h-5 w-5" />
          </button>
        </CopyToClipboard>
        <div className="absolute -inset-x-3 py-1 -bottom-6 hidden rounded-md bg-purple-600 transition-all duration-300 group-hover:block">
          <p className="text-center text-white text-xs">Copy Link</p>
        </div>
      </div>
    </div>
  );
}

export default CardImage;
