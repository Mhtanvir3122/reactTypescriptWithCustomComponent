import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "../../components/UI/card/Card";
import Pagination from "../../components/pazinationWithLimit/pazinationWithLimit";
import SearchBox from "../../components/topnav/searchBox/SearchBox";
import { ReportService } from "../../service/service";
import RoleForm from "./Form";
import RoleTable from "./Table";
import { useForm } from "react-hook-form";


interface Employee {
  id: number;
  name: string;
  email: string;
}

const URL = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [updatedData, setUpdatedData] = useState<any>();
  const [searchKey, setSearchKey] = useState<any>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
    
  
  useEffect(() => {
    getEmployeeList();

  }, [searchKey]);

  const {
      register,
      handleSubmit,
      reset,
      getValues, watch,
      control,
      setValue,
      formState: { errors },
    } = useForm();

  const getEmployeeList = () => {

    ReportService.roleSearch({ keyword: searchKey })
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
    e.permissionRole=e?.roles?.map((e:any)=>e.label);
    delete e.roles;
   ReportService.routeConfigSave({ ...e })
      .then((resp) => {
        setData(resp?.data);
        console.log(resp);
        
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      });
    

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
    ReportService.deleteRole(e)
      .then((res) => {
        getEmployeeList();
      })
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Role List</h2>

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

        <RoleForm
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          updateData={updatedData}
          onSubmit={onSubmit}
          submitLoading={true}
        />
        {!isDrawerOpen ?



          <div >
            <RoleTable
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


          : null}
      </Card>


    </div>
  );
};



export default URL;
