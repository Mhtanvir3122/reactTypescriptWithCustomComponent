import React from "react";
import { useTranslation } from "react-i18next";
import Summary from "../components/summary/Summary";
import SaleChart from "../components/chart/Chart";
import DashboardTables from "../components/tables/DashboardTables";
import ApexChart from "./ApexChart";

function Dashboard() {
  const { t } = useTranslation();
  return (
    <section>
      <h2 className="title">{t("dashboard")}</h2>
      {/* <Summary />
      <SaleChart />
      <DashboardTables /> */}
      <h6>Status Wise Task Count </h6>

      <ApexChart />
    </section>
  );
}

export default Dashboard;
