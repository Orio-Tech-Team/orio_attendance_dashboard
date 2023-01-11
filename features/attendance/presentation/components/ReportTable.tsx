"use client";

import MyTable from "@ui/MyTable";
import useGetAttendance from "../hooks/useGetAttendance";

const columns = [
  "ID",
  "Name",
  "Date",
  "Time In",
  "Time Out",
  "Working Hours",
  "Status",
  "Shift",
];

interface Props {
  data: any[];
  isLoading: boolean;
  present: number;
  absent: number;
  leave: number;
}

const ReportTable = ({ data, isLoading, present, absent, leave }: Props) => {
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
      <MyTable isLoading={isLoading} data={data} columns={columns} />
    </>
  );
};

export default ReportTable;
