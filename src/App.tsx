import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./scss/App.scss";

import LocalStorageCRUD from "./pages/cr";
import ForgotPass from "./components/forgotPass/ForgotPass";
import Registration from "./components/registration/Registration";
import Role from "./modules/role";
import RoleAssign from "./modules/roleAsign";
import ACLWrapper from "./components/ACL/Acl";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Customers = React.lazy(() => import("./pages/Customers"));
const CustomerEdit = React.lazy(() => import("./pages/CustomerEdit"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductEdit = React.lazy(() => import("./pages/ProductEdit"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BlankPage = React.lazy(() => import("./pages/BlankPage"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {

//   let username = localStorage.getItem("userInfo")||"";
//   let userInfo = JSON?.parse(username)||[];


//   console.log(userInfo?.roles.map((e: any) => e?.name));

// const userRole = userInfo?.roles.map((e: any) => e?.name); 
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/customers" element={<RoleAssign />} />
              <Route path="/customers/:customerId" element={<CustomerEdit />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductEdit />} />
              <Route path="/orders" element={<LocalStorageCRUD />} />
              <Route path="/analytics" element={<BlankPage />} />
              <Route path="/discount" element={<RoleAssign />} />
              <Route path="/inventory" element={<Role />} />


            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forget-pass" element={<ForgotPass />} />
          <Route path="/reg" element={<Registration />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
