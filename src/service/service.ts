import axios from "axios";
export interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
}


const API_URL = "http://localhost:8080/service1/";
const API_URL2 = "http://localhost:8080/service1/employees/save"; // API Gateway URL

console.log(API_URL);

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
    const response = await axios.put<Employee>(`${API_URL}/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};
