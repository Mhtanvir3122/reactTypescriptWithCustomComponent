import { Icon } from "@iconify/react";
import React from "react";

interface Item {
  id: string;
  name: string;
  email: string;
  department: string;
}

interface Props {
  visibleData: Item[];
  handleEditItem: any;
  handleDeleteItem: (id: number) => void;
}

const BlankTable: React.FC<Props> = ({ visibleData, handleEditItem, handleDeleteItem }) => {
  
  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>User Name</th>
          <th>Description</th>
          <th style={{ width: 200 }}>Action</th>
        </tr>
      </thead>
      <tbody>
      {visibleData?.map((item, key) => (
          <tr key={item.id}>
            <td>{key + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.department}</td>
            <td>
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "10px" }}
              >
             <button
                  onClick={() => handleEditItem(item)}
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
                  Delete <Icon icon="delete"/>
                </button> 
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlankTable;
