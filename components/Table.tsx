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
            <th className=" w-1/12">No</th>
            <th className=" w-1/12">IMAGE</th>
            <th className=" w-10/12 text-center">URL</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: string, index: number) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item}
                    alt="thumbnail"
                    className="bg-white h-12 w-12 my-1 rounded-full object-scale-down shadow-md"
                  />
                </td>
                <td className="whitespace-nowrap overflow-y-visible overflow-x-auto">{item}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
