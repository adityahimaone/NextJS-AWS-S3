import React from 'react';

interface ITable {
  data: string[];
}

function Table({ data }: ITable): JSX.Element {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 border-b-2 border-purple-500">List</h3>
      <table className="table-fixed w-full text-left">
        <thead>
          <tr>
            <th className="w-2/12 md:w-1/12">No</th>
            <th className="w-3/12 md:w-1/12">IMAGE</th>
            <th className="w-7/12 md:w-10/12 text-center">URL</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item: string, index: number) => (
              <tr key={item}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item}
                    alt="thumbnail"
                    className="bg-white h-min-5 w-min-5 h-12 w-12 my-1 rounded-full object-scale-down shadow-md"
                  />
                </td>
                <td className="whitespace-nowrap overflow-y-visible overflow-x-auto">{item}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-gray-500 font-medium">
                No Data!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
