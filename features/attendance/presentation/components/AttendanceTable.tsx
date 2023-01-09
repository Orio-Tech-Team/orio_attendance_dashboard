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
  "Action",
];

interface Props {
  date: string;
}

const AttendanceTable = ({ date }: Props) => {
  const { data, isLoading } = useGetAttendance(date);

  return (
    <>
      <MyTable isLoading={isLoading} data={data} columns={columns} />
    </>
  );
};

export default AttendanceTable;
