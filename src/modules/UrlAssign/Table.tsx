// import { Icon } from "@iconify/react";
// import React from "react";

// interface Item {
//   id: string;
//   icon: string;
//   link: string;
//   section: string;

//   permissionRole: [];
//   children: [];
// }

// interface Props {
//   visibleData: Item[];
//   handleEditItem: any;
//   handleDeleteItem: any
// }

// const RoleTable: React.FC<Props> = ({ visibleData, handleEditItem, handleDeleteItem }) => {

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>No</th>

//           <th>Role Name</th>
//           <th>Role Name</th>
//           <th>Role Name</th>
//           <th>Role Name</th>


//           <th style={{ width: 200 }}>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {visibleData?.map((item, key) => (
//           <tr key={item.id}>
//             <td>{key + 1}</td>
//             <td>{item?.icon}</td>
//             <td>{item?.link}</td>
//             <td>{item?.section}</td>



//             <td>{item?.children?.map((item2: any, key) => (
//               <tr key={item.id}>
//                 <td>{key + 1}</td>
//                 <td>{item2?.icon}</td>
//                 <td>{item2?.link}</td>
//                 <td>{item2?.section}</td>
//                 <td>
//                  <button
//                   onClick={() => handleEditItem({...item2,sub:true ,DTO:item?.permissionRole})}
//                   style={{ marginRight: "10px", padding: "5px 10px" }}
//                 >
//                   Edit
//                 </button>



//                 </td>



//               </tr>))}</td>


//               <td>
//               <div
//                 className="d-flex justify-content-center"
//                 style={{ marginTop: "10px" }}
//               >
//                 <button
//                   onClick={() => handleEditItem(item )}
//                   style={{ marginRight: "10px", padding: "5px 10px" }}
//                 >
//                   Sub Menu Added
//                 </button>


//               </div>
//             </td>

//             <td>
//               <div
//                 className="d-flex justify-content-center"
//                 style={{ marginTop: "10px" }}
//               >
//                 <button
//                   onClick={() => handleEditItem(item)}
//                   style={{ marginRight: "10px", padding: "5px 10px" }}
//                 >
//                   Edit
//                 </button>

//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default RoleTable;

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface Item {
  id: string;
  icon: string;
  link: string;
  section: string;
  permissionRole: [];
  children: [];
}

interface Props {
  visibleData: Item[];
  handleEditItem: any;
  handleDeleteItem: any
}

const RoleTable: React.FC<Props> = ({ visibleData, handleEditItem, handleDeleteItem }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th>No</th>
            <th>Menu Name</th>
            <th>Icon </th>
            <th>Link</th>
            <th>Roles</th>
            <th>Sub Menu</th>
            <th style={{ width: 200 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleData?.map((item, key) => (
            <>
              <tr key={item.id} className="border">

                <td>{key + 1}</td>
                <td className="border p-2">{item?.section}</td>
                <td className="border p-2">{item?.icon}</td>
                <td className="border p-2">{item?.link}</td>
                <td className="border p-2">{item?.permissionRole?.map((e:any)=>e?.name)?.join(', ')}</td>

                <td className="border p-2">
                  <button
                    onClick={() => toggleRow(item?.id)}
                    className="px-3 py-1 rounded"
                  >
                    {expandedRow === item.id ? "Sub Menu -" : "Sub Menu +"}
                  </button>
                </td>

                <td>
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginTop: "10px" }}
                  >
                    <button
                      onClick={() => handleEditItem(item)}
                      style={{ marginRight: "10px", padding: "5px 10px" }}
                    >
                      Add Roles
                    </button>

                  </div>
                </td>

              </tr>
              {expandedRow === item.id && (
                <tr className="bg-gray-600" style={{ backgroundColor: "#F8F3D9" }}>
                  <td colSpan={7} className="border p-2">
                    {item?.children?.length ?
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-200">
                            <th>No</th>
                            <th>Menu Name</th>
                            <th>Icon </th>
                            <th>Link</th>
                            <th>Roles</th>

                            <th style={{ width: 200 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item?.children?.map((item2: any, key) => (
                            <>
                              <tr key={item2.id} className="border">
                                <td>{key + 1}</td>
                                <td className="border p-2">{item2?.section}</td>
                                <td className="border p-2">{item2?.icon}</td>
                                <td className="border p-2">{item2?.link}</td>
                                <td className="border p-2">{item2?.permissionRole?.map((e:any)=>e?.name)?.join(', ')}</td>

                                <td>
                                  <button
                                    onClick={() => handleEditItem({ ...item2, sub: true, DTO: item?.permissionRole })}
                                    style={{ marginRight: "10px", padding: "5px 10px" }}
                                  >
                                    Add Roles
                                  </button>
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table> : null}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;



