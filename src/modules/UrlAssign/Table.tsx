import { Icon } from "@iconify/react";
import React from "react";

interface Item {
  id: string;
  icon: string;
  link: string;
  section: string;

  permissionRole: [];
  children: [];
}


interface Item2 {
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

  return (
    <table>
      <thead>
        <tr>
          <th>No</th>

          <th>Role Name</th>
          <th>Role Name</th>
          <th>Role Name</th>
          <th>Role Name</th>


          <th style={{ width: 200 }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {visibleData?.map((item, key) => (
          <tr key={item.id}>
            <td>{key + 1}</td>
            <td>{item?.icon}</td>
            <td>{item?.link}</td>
            <td>{item?.section}</td>


            
            <td>{item?.children?.map((item2: any, key) => (
              <tr key={item.id}>
                <td>{key + 1}</td>
                <td>{item2?.icon}</td>
                <td>{item2?.link}</td>
                <td>{item2?.section}</td>
                <td><button
                  onClick={() => handleEditItem({...item2,sub:true ,DTO:item?.permissionRole})}
                  style={{ marginRight: "10px", padding: "5px 10px" }}
                >
                  Edit
                </button>
                
               
                
                </td>



              </tr>))}</td>


              <td>
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "10px" }}
              >
                <button
                  onClick={() => handleEditItem(item )}
                  style={{ marginRight: "10px", padding: "5px 10px" }}
                >
                  Sub Menu Added
                </button>
               
                
              </div>
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
                  Edit
                </button>
                
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoleTable;
