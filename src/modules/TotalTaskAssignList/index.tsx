import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "../../components/UI/card/Card";
import Pagination from "../../components/pazinationWithLimit/pazinationWithLimit";
import SearchBox from "../../components/topnav/searchBox/SearchBox";
import { ReportService } from "../../service/service";
import RoleForm from "./Form";
import RoleTable from "./Table";
import SearchableSelect from "../../components/UI/Select/new";
import { useForm } from "react-hook-form";
import DatePicker from "../../components/UI/input/DateInput";


interface Employee {
  id: number;
  name: string;
  email: string;
}

const TaskAssignAgentList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [employees, setEmployees] = useState<any>();

  const [roleData, setRoleData] = useState<any>();

  const [data2, setData2] = useState<any>();
  const [updatedData, setUpdatedData] = useState<any>();
  const [searchKey, setSearchKey] = useState<any>();
  const [statusKey, setStatusKey] = useState<any>();
  const [priyorityKey, setPiyorityKey] = useState<any>();
  const [createdByKey, setCreatedByKey] = useState<any>();



  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    getValues, watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();


  let username = localStorage?.getItem("userInfo") || "";
  let userInfo = JSON.parse(username || "[]"); // Ensure it defaults to an empty array


  useEffect(() => {
    getEmpList();

  }, []);


  const getEmpList = () => {
    ReportService.registrationEmpList({ keyword: '' })
      .then((resp) => {
        setEmployees(resp?.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDataList();

  }, [searchKey, statusKey, priyorityKey, createdByKey]);

  const getDataList = () => {
    ReportService.tsskFilterList({
      assignedUserId: userInfo?.id,
      status: statusKey,
      priority: priyorityKey,
      createdBy: createdByKey,

    })
      .then((resp) => {
        console.log(resp);

        setData(resp);
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRoleList();

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

    ReportService?.taskUpdate(updatedData?.id, e)
      .then((resp) => {
        getDataList();

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
    getDataList();


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
        getDataList();
      })
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>

      <Card>
        {!isDrawerOpen ? <>
          <h2>All My Task(Agent) </h2>
          <hr />
          {/* <SearchBox searchKey={setSearchKey} /> */}

          <div className="row mt-4">

            <div className="col-4">


              <SearchableSelect
                setValue={setValue}
                options={employees?.map((item: any) => ({
                  id: item.id,
                  name: item.username
                })) || []}

                onChange={(e) => { setCreatedByKey(e?.value) }}
                fieldName="emp"
                isMulti={false}
                label='Created By '
                isReq={false}


              />
            </div>
            <div className="col-4">
              <SearchableSelect
                setValue={setValue}
                options={[
                  { id: "1", name: 'TODO' },
                  { id: "2", name: 'IN_PROGRESS' },
                  { id: "3", name: 'EXPIRED' },
                  { id: "4", name: 'COMPLETED' },
                ]}

                onChange={(e) => { setStatusKey(e?.label) }}
                fieldName="status"
                isMulti={false}
                label='Status '
                isReq={false}


              />
            </div>

            <div className="col-4">

              <SearchableSelect
                setValue={setValue}
                options={[
                  { id: "1", name: 'HIGH' },
                  { id: "2", name: 'LOW' },

                ]}

                onChange={(e) => { setPiyorityKey(e?.label) }}
                fieldName="proyority"
                isMulti={false}
                label='Priyority '
                isReq={false}


              />
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



export default TaskAssignAgentList;
