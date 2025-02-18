import axios from "axios";
export interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
}


const API_URL = "http://localhost:8080/service1/";
const API_URL2 = "http://localhost:8080/service1/employees/save"; // API Gateway URL
const API_URLUpdate = "http://localhost:8080/service1/employees/update"; // API Gateway URL
const API_URLDelete = "http://localhost:8080/service1/employees/delete"; // API Gateway URL




export const getEmployees = async () => {
    const response = await axios.get<Employee[]>(API_URL);
    return response.data;
};

export const getEmployeeById = async (id: number) => {
    const response = await axios.get<Employee>(`${API_URL}/${id}`);
    return response.data;
};

export const createEmployee = async (employee: Employee) => {
    const response = await axios.post<Employee>(API_URL2, employee);
    return response.data;
};

export const updateEmployee = async (id: number, employee: Employee) => {
    const response = await axios.put<Employee>(`${API_URLUpdate}/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id: number) => {
    const response =await axios.delete(`${API_URLDelete}/${id}`);
    return response.data;

};


export const ReportService = {
    orgWiseAssetStatistics: async (payload:any): Promise<any> =>
      await axios.post( "http://localhost:8080/service1/employees/search", payload),

    deleteEmployee: async (id: number): Promise<any> =>
        await axios.delete(`${API_URLDelete}/${id}`),
}