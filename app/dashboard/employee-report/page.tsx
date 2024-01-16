"use client";

import MyButton from "@ui/MyButton";
import MyDatePicker from "@ui/MyDatePicker";
import ReportTable from "features/attendance/presentation/components/ReportTable";
import useGetEmployees from "features/attendance/presentation/hooks/useGetEmployees";
import useGetReport from "features/attendance/presentation/hooks/useGetReport";
import MUIDataTable from "mui-datatables";
import { useState } from "react";
import MySelect from "shared/components/MySelect";
import { dateToString } from "shared/utils/date_time";

const PdfReport = ({data}:{data:any}) => {
  let cols = ["ID","Name","Date","Day","Time In","Time Out","Working Hours","Status","Shift"];

  return (
    // <div className="flex flex-col justify-center items-center">
    //   <h2 className="text-primary my-3">Employee  Report</h2>
    //   <table border={2}>
    //     <thead>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Date</th>
    //         <th>Day</th>
    //         <th>Time In</th>
    //         <th>Time Out</th>
    //         <th>Working Hours</th>
    //         <th>Status</th>
    //         <th>Shift</th>
    //     </thead>
    //     <tbody>
    //     </tbody>
    //   </table>
    // </div>
    <MUIDataTable title="" data={data} columns={cols} />
  )
}

const Page = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const employees = useGetEmployees();
  const [employeeId, setEmployeeId] = useState(0);
  const { data, csvData, isLoading, getAttendance, present, absent, leave } =
    useGetReport(fromDate, toDate, employeeId);

  
  data.map((itm)=>{
    console.log(itm);
  })

  return (
    <div className="p-8">
      <div className="flex gap-8">
        <MyDatePicker
          value={fromDate}
          setValue={setFromDate}
          name="From Date"
        />
        <MyDatePicker value={toDate} setValue={setToDate} name="To Date" />
        <MySelect
          className="w-[15rem]"
          label="Employee"
          items={employees}
          setItem={setEmployeeId}
        />
        <MyButton
          type="button"
          className="w-[15rem] h-[3.5rem]"
          onClick={getAttendance}
        >
          Get Report
        </MyButton>
      </div>
      <ReportTable
        data={data}
        csvData={csvData}
        isLoading={isLoading}
        present={present}
        absent={absent}
        leave={leave}
      />
    </div>
  );
};

export default Page;
