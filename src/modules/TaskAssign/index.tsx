import { useEffect, useState } from "react";
import { Button, Toast } from "react-bootstrap";
import Card from "../../components/UI/card/Card";
import Pagination from "../../components/pazinationWithLimit/pazinationWithLimit";
import SearchBox from "../../components/topnav/searchBox/SearchBox";
import { ReportService } from "../../service/service";
import RoleForm from "./Form";
import RoleTable from "./Table";


interface Employee {
  id: number;
  name: string;
  email: string;
}

const TaskAssign = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [roleData, setRoleData] = useState<any>();

  const [data2, setData2] = useState<any>();
  const [updatedData, setUpdatedData] = useState<any>();
  const [searchKey, setSearchKey] = useState<any>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    getEmployeeList();

  }, [searchKey]);

  const getEmployeeList = () => {
    ReportService.tsskList({ keyword: searchKey })
      .then((resp) => {
        setData(resp);
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRoleList ();

  }, []);

  const getRoleList = () => {
    ReportService.getAgentsByFign()
      .then((resp) => {
        setRoleData(resp?.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (e: any) => {
    
    ReportService.taskAssign(  updatedData?.id,e?.agent?.value  )
      .then((resp) => {

        getEmployeeList();
        
      })
      .catch((err) => {
        alert(err?"All Agent Are Busy!":null);


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
    ReportService.taskDelete(e)
      .then((res) => {
        getEmployeeList();
      })
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>

      <Card>
        {!isDrawerOpen ? <>
          <h2>Role Assign List</h2>
<hr />
          <SearchBox searchKey={setSearchKey} />
          <div className="d-flex justify-content-end mt-2 mb-3">
            {/* <Button color="primary" onClick={() => setIsDrawerOpen(true)}>
              যুক্ত করুন
            </Button> */}
          </div>
        </>

          : null}

        <RoleForm
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          updateData={updatedData}
          onSubmit={onSubmit}
          submitLoading={true}
          roleData={roleData}
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



export default TaskAssign;
