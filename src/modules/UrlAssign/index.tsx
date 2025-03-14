import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

const UrlAssign = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  const [updatedData, setUpdatedData] = useState<any>();
  const [searchKey, setSearchKey] = useState<any>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [roleData, setRoleData] = useState<any>();

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

    ReportService.routeGetPost({ keyword: searchKey })
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
    updatedData?.sub ?

      ReportService.routeConfigAssignChild(updatedData?.id, e?.roles?.map((e: any) => e?.value)) .then((resp) => {
        // setData(resp?.data);
        console.log(resp);
        onDrawerClose()
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      }) :
      ReportService.routeConfigAssign(updatedData?.id, e?.roles?.map((e: any) => e?.value))

        .then((resp) => {
          // setData(resp?.data);
          console.log(resp);
          onDrawerClose()
        })
        .catch((err) => {
        })
        .finally(() => {
          setLoading(false);
        });


    // onDrawerClose();

  }
  const onDrawerClose = () => {

    setIsDrawerOpen(false);
    setUpdatedData(null);
    getEmployeeList();


  };



  const handlePageChange = (visibleData: any[], page: number, limit: number) => {
    setData2(visibleData);
  };

  const handleEditItem = (id: any) => {
    setIsDrawerOpen(true);
    setUpdatedData(id)



  };

  const handleDeleteItem = (e: number) => {
    ReportService.deleteRole(e)
      .then((res) => {
        getEmployeeList();
      })
  };

  useEffect(() => {
    getRoleList();


  }, []);


  const getRoleList = () => {
    ReportService.roleSearch({ keyword: searchKey })
      .then((resp) => {
        setRoleData(resp?.data);
      })
      .catch((err) => {
      })
      ;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>

      <Card>
        {!isDrawerOpen ? <>
          <h2>Assign Role in Menu</h2>
<hr/>
          <SearchBox searchKey={setSearchKey} />

        </>

          : null}

        <RoleForm
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          updateData={updatedData}
          onSubmit={onSubmit}
          submitLoading={true}
          data={roleData}
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



export default UrlAssign;
