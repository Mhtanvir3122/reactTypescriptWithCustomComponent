import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import TextArea from "../components/UI/input/textArea";
import { useForm } from "react-hook-form";
import Card from "../components/UI/card/Card";
import Input2 from "../components/UI/input/Input2";
import { createEmployee,  deleteEmployee,  ReportService, updateEmployee } from "../service/service";
import SearchBox from "../components/topnav/searchBox/SearchBox";
import TypeBranchForm from "./form/Form";
import BlankTable from "./table/blankTable";
import Pagination from "../components/pazinationWithLimit/pazinationWithLimit";

const API_URL = "http://localhost:8080/service1/employees/getList"; // API Gateway URL


interface Employee {
  id: number;
  name: string;
  email: string;
}

const BlankPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [updatedData, setUpdatedData] = useState<any>();


  const [searchKey, setSearchKey] = useState<any>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
  } = useForm();
  useEffect(() => {
    getEmployeeList();

  }, [searchKey]);

  const getEmployeeList = () => {
    ReportService.orgWiseAssetStatistics({ keyword: searchKey })
      .then((resp) => {
        setData(resp);
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onSubmit = (e: any) => {
    
    updatedData?.id? updateEmployee(updatedData?.id,e): createEmployee(e);
    onDrawerClose();

  }
  const onDrawerClose = () => {

    setIsDrawerOpen(false);
    setUpdatedData(null);
    getEmployeeList();


  };
  const handlePageChange = (visibleData: any[], page: number, limit: number) => {
    setData2(visibleData);
  };

  const handleEditItem = (id: string) => {
    setIsDrawerOpen(true);
    setUpdatedData(id)
    

 
  };

     const handleDeleteItem = (e: number) => {
      ReportService.deleteEmployee(e)
        .then((res) => {
          getEmployeeList();
        })
    };

  // const handleDeleteItem = (e: number) => {
  //   deleteEmployee(e);
    
  //   onDrawerClose();

  // };
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Employee List</h2>

      <Card>
        {!isDrawerOpen ? <>
          <SearchBox searchKey={setSearchKey} />
          <div className="d-flex justify-content-end mt-4 mb-3">
            <Button color="primary" onClick={() => setIsDrawerOpen(true)}>
              যুক্ত করুন
            </Button>
          </div>
        </>

          : null}

        <TypeBranchForm
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          updateData={updatedData}
          onSubmit={onSubmit}
          submitLoading={true}
        />
        {!isDrawerOpen ?



<div >
<BlankTable
  handleDeleteItem={handleDeleteItem}
  handleEditItem={handleEditItem}
  visibleData={data2} />

<br></br>
<Pagination
  data={data?.data}
  defaultLimit={10}
  onPageChange={handlePageChange}
/>

</div>

          // <ul>
          //   {data?.data?.map((emp: any) => (

          //     <li key={emp?.id}>
          //       {emp?.name} - {emp?.email}
          //     </li>
          //   ))}
          // </ul>
          : null}
      </Card>


    </div>
  );
};



export default BlankPage;
