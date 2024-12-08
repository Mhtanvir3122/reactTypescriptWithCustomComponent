import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Input2 from "../components/UI/input/Input2";
import TextArea from "../components/UI/input/textArea";
import ReactPaginate from "react-paginate";
import "../pages/style.scss";
// import Card from "../components/UI/card/Card";
// import { Card } from 'react-bootstrap';

import Button from "../components/UI/button/Button";
import Card from "../components/UI/card/Card";
import PaginationWithLimit from "../components/pazinationWithLimit/pazinationWithLimit";
import Pagination from "../components/pazinationWithLimit/pazinationWithLimit";
const ITEMS_PER_PAGE = 5;

// Define the Item type
interface Item {
  id: string;
  title: string;
  description: string;
  userName: string;

}

const LocalStorageCRUD = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [editId, setEditId] = useState<string | null>(null);
  const [visibleData, setVisibleData] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  // Load items from localStorage on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems) as Item[]);
    }
  }, []);

  // Save items to localStorage whenever items state changes
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Add or update item
  const onSubmit = (e: any) => {


    if (editId) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editId ? { ...item, ...e } : item
        )
      );
      setEditId(null);
    } else {
      const newItemObject: Item = {
        id: crypto.randomUUID(),
        ...e

      };
      setItems([...items, newItemObject]);
    }
    // reset({ title: "", description: "", userName: "" })
  };

  // Edit item
  const handleEditItem = (id: string) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      reset({ itemToEdit })
      console.log(itemToEdit, "itemToEdit");
      reset(itemToEdit)

      setEditId(id);
    }
  };

  // Delete item
  const handleDeleteItem = (id: string) => {
    setItems(items?.filter((item) => item?.id !== id));
  };
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Handle page change
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  console.log(visibleData);
  
  // Mock data
  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  const handlePageChange = (visibleData: any[], page: number, limit: number) => {
    setVisibleData(visibleData);
    // inputRef.current==visibleData
  };
  // Calculate the current items to display based on pagination
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = visibleData.slice(offset, offset + ITEMS_PER_PAGE);
  return (
    <div>
      <h1>React TypeScript CRUD </h1>
      <br />
      <br />
      <div >
      {/* <Card> */}

      <form onSubmit={(handleSubmit(onSubmit))}>

      <Card>
        
   

        <div className="row">
          <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
            <Input2
              register={register("title",)}
              label="Title"
              type="text"
              // value={"title"}
              onValueChange={(value) => setValue("title", value)}
              placeholder="Enter User Name"
              inputStyle={{
                padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                minWidth: "100%"
              }}

            />

          </div>
          <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
            <Input2
              register={register("userName")}
              label="userName"
              type="text"
              // value={"userName"}
              onValueChange={(value) => setValue("userName", value)}
              placeholder="Enter User Name"
              inputStyle={{
                padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                minWidth: "100%"
              }}

            />

          </div>

          <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">

            <TextArea
              label="description"
              register={register("description")}
              onValueChange={(e) => setValue("description", e)}
              // value={"description"}
              // onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              placeholder="Enter description"
              style={{
                // padding: "8px",
                width: "100%",  // Takes full width of parent
                maxWidth: "100%", // Caps the width
                minWidth: "100%", // Sets a minimum width
                minHeight: "100px",
                height: "100px"
              }} />
          </div>
        </div>
        <div className="d-flex justify-content-end mb-5">
        
    <Button type="submit">{editId ? "Update" : "Add"}</Button>

        
        </div>
        </Card>
   
      </form>
      {/* </Card> */}
     
      </div>


      <div >
      <table >
        <thead>
          <tr>
            <th>Title</th>
            <th>User Name</th>
            <th>Description</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {visibleData.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.userName}</td>
              <td>{item.description}</td>
              <td><div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleEditItem(item?.id)}
                style={{ marginRight: "10px", padding: "5px 10px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteItem(item?.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                }}
              >
                Delete
              </button>
            </div></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <Pagination
        data={items}
        defaultLimit={10}
        onPageChange={handlePageChange}
      />     
        {/* <ul>
        {visibleData?.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul> */}

      
{/*       
       <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math?.ceil(items?.length / ITEMS_PER_PAGE)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      /> */}
    </div>

    </div>
  );
};

export default LocalStorageCRUD;
