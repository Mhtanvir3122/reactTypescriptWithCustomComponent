import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input2 from "../components/UI/input/Input2";
import TextArea from "../components/UI/input/textArea";
import "../pages/style.scss";
// import Card from "../components/UI/card/Card";
// import { Card } from 'react-bootstrap';

import Button from "../components/UI/button/Button";
import Card from "../components/UI/card/Card";
import Pagination from "../components/pazinationWithLimit/pazinationWithLimit";
import DataTable from "./table/crTable";
import Modal from "../components/Modal";
import { ConfirmationUnPublishModal } from "../components/Modal/ConfirmationUnPublishModal";

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
    reset({ title: "", description: "", userName: "" })
  };

  // Edit item
  const handleEditItem = (id: string) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      reset(itemToEdit)
      setEditId(id);
    }

  };

  // Delete item
  const handleDeleteItem = (id: string) => {
    setItems(items?.filter((item) => item?.id !== id));
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePageChange = (visibleData: any[], page: number, limit: number) => {
    setVisibleData(visibleData);
    console.log(visibleData);
    
  };

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
      <button onClick={openModal}>Open Modal</button>

<ConfirmationUnPublishModal isOpen={isModalOpen} onClose={closeModal} />



      <div >
        <DataTable
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
          visibleData={visibleData} />

        <br></br>
        <Pagination
          data={items}
          defaultLimit={10}
          onPageChange={handlePageChange}
        />

      </div>

    </div>
  );
};

export default LocalStorageCRUD;
