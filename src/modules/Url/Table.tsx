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
            <th>Sub Menu</th>
            <th style={{ width: 200 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleData?.map((item, key) => (
            <>
              <tr key={item.id} className="border">

                <td>{key + 1}</td>
                <td className="border p-2">{item.section}</td>
                <td className="border p-2">{item.icon}</td>
                <td className="border p-2">{item.link}</td>
                <td className="border p-2">
                  <button
                    onClick={() => toggleRow(item.id)}
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
                      onClick={() => handleEditItem({ ...item, edit: true })}
                      style={{ marginRight: "10px", padding: "5px 10px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(Number(item.id))}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                      }}
                    >
                      Delete <Icon icon="delete" />
                    </button>
                  </div>
                </td>

              </tr>
              {expandedRow === item.id && (
                <tr className="bg-gray-600" style={{ backgroundColor: "#F8F3D9" }}>
                  <td colSpan={6} className="border p-2">

                    <Button color="primary" onClick={() => handleEditItem({ ...item, 'menu': true })}>
                      যুক্ত করুন
                    </Button>

                    {item?.children?.length ?
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-200">
                            <th>No</th>
                            <th>Menu Name</th>
                            <th>Icon </th>
                            <th>Link</th>
                            <th style={{ width: 200 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item?.children?.map((item: any, key) => (
                            <>
                              <tr key={item.id} className="border">
                                <td>{key + 1}</td>
                                <td className="border p-2">{item.section}</td>
                                <td className="border p-2">{item.icon}</td>
                                <td className="border p-2">{item.link}</td>
                                <td><button
                                  onClick={() => handleEditItem({ ...item, 'subMenu': true })}
                                  style={{ marginRight: "10px", padding: "5px 10px" }}
                                >
                                  Edit
                                </button>
                                  <button
                                    onClick={() => handleDeleteItem({ ...item, 'submenu': true })}
                                    style={{
                                      padding: "5px 10px",
                                      backgroundColor: "#f44336",
                                      color: "white",
                                      border: "none",
                                    }}
                                  >
                                    Delete <Icon icon="delete" />
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

