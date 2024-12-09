import React from "react";

interface Item {
  id: string;
  title: string;
  userName: string;
  description: string;
}

interface Props {
  visibleData: Item[];
  handleEditItem: (id: string) => void;
  handleDeleteItem: (id: string) => void;
}

const DataTable: React.FC<Props> = ({ visibleData, handleEditItem, handleDeleteItem }) => {
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
        {visibleData.map((item, key) => (
          <tr key={item.id}>
            <td>{key + 1}</td>
            <td>{item.title}</td>
            <td>{item.userName}</td>
            <td>{item.description}</td>
            <td>
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "10px" }}
              >
                <button
                  onClick={() => handleEditItem(item.id)}
                  style={{ marginRight: "10px", padding: "5px 10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
