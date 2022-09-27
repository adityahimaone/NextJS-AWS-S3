import React from 'react';

function Navbar(): JSX.Element {
  return (
    <nav className="p-2 bg-white shadow-lg z-10">
      <div className="container mx-auto max-w-screen-md">
        <div className="flex justify-between">
          <div className="flex items-baseline space-x-3 ">
            <div className="p-1 rounded-md bg-purple-700 font-medium text-white">MC</div>
            <span className="text-base font-medium">Media Center</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
