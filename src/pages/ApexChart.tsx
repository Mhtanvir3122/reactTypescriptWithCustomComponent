import ApexCharts from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ReportService } from "../service/service";

interface ChartState {
  series: { data: number[] }[];
  options: ApexCharts.ApexOptions;
}

const ApexChart: React.FC = () => {
  const colors: string[] = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#546E7A", "#26a69a", "#D10CE8"];
  const [roleData, setRoleData] = useState<{ series: { data: number[] }[]; categories: string[] } | null>(null);

  useEffect(() => {
    getRoleList();
  }, []);

  const getRoleList = async () => {
    try {
      const resp = await ReportService.taskWiseStatusCount();
      const transformedData = {
        series: [{ data: resp?.data?.map((item: any) => item.count) }],
        categories: resp?.data?.map((item: any) => item.status),
      };
      setRoleData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial State (will update after API call)
  const [state, setState] = useState<ChartState>({
    series: [{ data: [] }],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    },
  });

  // Update State When roleData Changes
  useEffect(() => {
    if (roleData) {
      setState((prevState) => ({
        ...prevState,
        series: roleData.series,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: roleData.categories,
          },
        },
      }));
    }
  }, [roleData]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
