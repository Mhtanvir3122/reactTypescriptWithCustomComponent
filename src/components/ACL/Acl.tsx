import React, { useEffect, useState } from "react";
import { ReportService } from "../../service/service";

interface ACLWrapperProps {
  visibleToRoles: string[];
  children: React.ReactNode;
}


const ACLWrapper: React.FC<ACLWrapperProps> = ({ visibleToRoles, children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  

  // Output: [["USER", "ADMIN"], ["USER"]]
  let username = localStorage?.getItem("userInfo")||"";
  let userInfo = JSON.parse(username || "[]"); // Ensure it defaults to an empty array


  const userRole = Array.isArray(userInfo?.roles) 
  ? userInfo.roles.map((e: any) => e?.name) 
  : [];

  
  useEffect(() => {
    getEmployeeList();

  }, []);

  const getEmployeeList = () => {
    ReportService.roleSearch({ keyword: '' })
      .then((resp) => {
        setData(resp?.data?.map((e:any)=>e?.name));
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

const userRoles = ["USER_ROLE", "MANAGER"]; // User's assigned roles (example)

const hasAccess = userRole?.some((role:any) => visibleToRoles?.includes(role))||userRoles?.some((role:any) => visibleToRoles?.includes(role));



  if (!hasAccess) {
    return null; // অনুমতি না থাকলে কিছুই দেখাবে না
  }
  return <>{children}</>;
};

export default ACLWrapper;
