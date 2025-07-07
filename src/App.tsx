import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import "./scss/App.scss";

import ForgotPass from "./components/forgotPass/ForgotPass";
import Registration from "./components/registration/Registration";
import Role from "./modules/role";
import RoleAssign from "./modules/roleAsign";
import LocalStorageCRUD from "./pages/cr";
import URL from "./modules/Url";
import UrlAssign from "./modules/UrlAssign";
import ChatComponent from "./modules/chat/chat";
import TaskCreate from "./modules/TaskCreate";
import TaskAssign from "./modules/TaskAssign";
import TaskAssignAgentList from "./modules/TotalTaskAssignList";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BlankPage = React.lazy(() => import("./pages/BlankPage"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/orders" element={<LocalStorageCRUD />} />
              <Route path="/analytics" element={<ChatComponent />} />
              <Route path="/role-assign" element={<RoleAssign />} />
              <Route path="/role" element={<Role />} />
              <Route path="/url" element={<URL />} />
              <Route path="/url-assign" element={<UrlAssign />} />
              <Route path="/url-blank" element={<BlankPage />} />
              <Route path="/task-create" element={<TaskCreate />} />
              <Route path="/task-assign" element={<TaskAssign />} />
              <Route path="/ageent-task" element={<TaskAssignAgentList />} />

              <Route path="/course" element={<TaskAssignAgentList />} />
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
