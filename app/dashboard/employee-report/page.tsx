"use client";

import MyButton from "@ui/MyButton";
import MyDatePicker from "@ui/MyDatePicker";
import ReportTable from "features/attendance/presentation/components/ReportTable";
import useGetEmployees from "features/attendance/presentation/hooks/useGetEmployees";
import useGetReport from "features/attendance/presentation/hooks/useGetReport";
import { useState } from "react";
import MySelect from "shared/components/MySelect";
import { dateToString } from "shared/utils/date_time";

const Page = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const employees = useGetEmployees();
  const [employeeId, setEmployeeId] = useState(0);
  const { data, isLoading, getAttendance, present, absent, leave } =
    useGetReport(fromDate, toDate, employeeId);

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
        isLoading={isLoading}
        present={present}
        absent={absent}
        leave={leave}
      />
    </div>
  );
};

export default Page;
