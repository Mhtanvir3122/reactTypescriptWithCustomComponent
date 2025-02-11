import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import TextArea from "../components/UI/input/textArea";
import { useForm } from "react-hook-form";
import Card from "../components/UI/card/Card";
import Input2 from "../components/UI/input/Input2";
import { createEmployee, ReportService } from "../service/service";
import ThemeContext from "../store/themeContext";

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

    const [error, setError] = useState<string | null>(null);
    const themeCtx = useContext(ThemeContext);

    const isdark= themeCtx?.theme==="dark"

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
     
    }, []);

    const getEmployeeList = () => {
      ReportService.orgWiseAssetStatistics({emails:["tanvirhider24@gmail.com"]})
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
      createEmployee(e)

      
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Employee List</h2>
            <form onSubmit={(handleSubmit(onSubmit))}>

<Card>



  <div className="row">
    <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
      <Input2
        register={register("name",)}
        label="name"
        type="text"
        // value={"name"}
        onValueChange={(value) => setValue("name", value)}
        placeholder="Enter User Name"
        inputStyle={{
          padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
          minWidth: "100%"
        }}

      />

    </div>
    <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
      <Input2
        register={register("email")}
        label="email"
        type="text"
        // value={"email"}
        onValueChange={(value) => setValue("email", value)}
        placeholder="Enter User Name"
        inputStyle={{
          padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
          minWidth: "100%",

        }}

      />

    </div>

    <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6 ">

      <TextArea
        label="department"
        register={register("department")}
        onValueChange={(e) => setValue("department", e)}
        placeholder="Enter department"
        inputStyle={{
          // padding: "8px",
          width: "100%",  // Takes full width of parent
          maxWidth: "100%", // Caps the width
          minWidth: "100%", // Sets a minimum width
          minHeight: "100px",
          height: "100px",
        }} 
        />
    </div>
  </div>
  <div className="d-flex justify-content-end mb-5">

    <Button type="submit">{"Add"}</Button>


  </div>
</Card>

</form>
            <ul>
                {data?.data?.map((emp:any) => (

                    <li key={emp?.id}>
                        {emp?.name} - {emp?.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default BlankPage;
