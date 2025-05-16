import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface Item {
  id: string;
  name: string;
  priority: string;
  status: string;
  description: string;
  createdDate: string;
  dueDate: string;
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
            <th>Task Name</th>
            <th>Priority </th>
            <th>Status</th>
            <th>Description</th>
            <th>Created Date</th>
            <th>Expire Date</th>
            <th style={{ width: 200 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleData?.map((item, key) => (
            <>
              <tr key={item.id} className="border">

                <td>{key + 1}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.priority}</td>
                <td className="border p-2">{item.status}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.createdDate?.slice(0,10)}</td>
                <td className="border p-2">{item.dueDate?.slice(0,10)}</td>



              

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
             
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;

