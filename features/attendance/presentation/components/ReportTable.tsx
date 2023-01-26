"use client";

import MyTable from "@ui/MyTable";
import useGetAttendance from "../hooks/useGetAttendance";
import { CSVLink } from "react-csv";
import MyButton from "@ui/MyButton";

const columns = [
  "ID",
  "Name",
  "Date",
  "Day",
  "Time In",
  "Time Out",
  "Working Hours",
  "Status",
  "Shift",
];

interface Props {
  data: any[];
  csvData: any[];
  isLoading: boolean;
  present: number;
  absent: number;
  leave: number;
}

const ReportTable = ({
  data,
  csvData,
  isLoading,
  present,
  absent,
  leave,
}: Props) => {
  return (
    <>
      <div className="mt-[2rem] flex gap-[2rem]">
        <div className="p-[2rem] bg-[#b6ff8d] rounded-md w-[16.7rem]">
          <p>Total Present</p>
          <h2>{present}</h2>
        </div>
        <div className="p-[2rem] bg-[#ffd19c] rounded-md w-[16.7rem]">
          <p>Total Late</p>
          <h2>{leave}</h2>
        </div>
        <div className="p-[2rem] bg-[#ff9c9c] rounded-md w-[16.7rem]">
          <p>Total Absent</p>
          <h2>{absent}</h2>
        </div>
      </div>

      <div className="mt-[2rem]">
        <CSVLink data={csvData}>
          <MyButton>Download Report</MyButton>
        </CSVLink>
      </div>
      <MyTable isLoading={isLoading} data={data} columns={columns} />
    </>
  );
};

export default ReportTable;
