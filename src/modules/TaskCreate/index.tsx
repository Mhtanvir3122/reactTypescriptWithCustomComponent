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

const TaskCreate = () => {
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
    delete e.permissionRole
    delete e.id

    updatedData?.menu ?
      ReportService?.routeConfigUpdate({ children: [e], ...e }, updatedData?.id).then((resp) => {
        //  getEmployeeList();
        onDrawerClose()
      })
        .catch((err) => {
        })
        .finally(() => {
          setLoading(false);
        }) :
      updatedData?.edit ?
        ReportService?.routeConfigUpdate2(updatedData?.id, e).then((resp) => {
          //  getEmployeeList();
          onDrawerClose()
        })
          .catch((err) => {
          })
          .finally(() => {
            setLoading(false);
          }) :
        updatedData?.subMenu ?
          ReportService.routeConfigUpdatedd(e, updatedData?.id).then((resp) => {
            //  getEmployeeList();
            onDrawerClose()
          })
            .catch((err) => {
            })
            .finally(() => {
              setLoading(false);
            })
          :
          ReportService.routeConfigSave({ ...e })
            .then((resp) => {
              onDrawerClose()

            })
            .catch((err) => {
            })
            .finally(() => {
              setLoading(false);
            })


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

  const handleDeleteItem = (e: any) => {
    e?.submenu ?
      ReportService.routeConfigDelete(e?.id) :
      ReportService.routeConfigDeleteParent(e)
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
          <h2>  Task List</h2>
          <hr />
          <div className="row ">
            <div className="col-10 ">          
              <SearchBox searchKey={setSearchKey} />
            </div>
            <div className="col-2  d-flex justify-content-center" >
              <Button color="primary" onClick={() => setIsDrawerOpen(true)}>
                যুক্ত করুন
              </Button>
            </div>
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



export default TaskCreate;
