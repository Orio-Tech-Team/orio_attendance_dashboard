import { TextField } from "@mui/material";
import MyDatePicker from "@ui/MyDatePicker";
import MyTimePicker from "@ui/MyTimePicker";
import React, { useEffect, useState } from "react";

import {
  dateToString,
  stringTimeToDate,
  timeToString,
} from "shared/utils/date_time";
import useUpdateAttendance from "features/attendance/presentation/hooks/useUpdateAttendance";
import UpdateAttendanceParams from "features/attendance/data/params/update_attendance_params";
import MySwal from "@ui/MySwal";
import { useRouter } from "next/navigation";
import MyButton from "@ui/MyButton";

interface Props {
  update: string | null;
}
const UpdateAttendanceForm = ({ update }: Props) => {
  const { updateAttendance, isLoading } = useUpdateAttendance();

  const [message, setMessage] = useState("Add");

  const [empNo, setEmpNo] = useState("");
  const [date, setDate] = useState(new Date());
  const [inTime, setInTime] = useState(new Date());
  const [outTime, setOutTime] = useState(new Date());

  const router = useRouter();
  const navigateToAttendance = () => router.push("/dashboard");

  const [addOutTime, setAddOutTime] = useState(false);

  useEffect(() => {
    if (update) {
      setMessage("Update");

      const localData: any = JSON.parse(localStorage.getItem("data")!);
      setEmpNo(localData.emp_id);
      setDate(new Date(Date.parse(localData.attendance_date)));
      setInTime(stringTimeToDate(localData.in_time));
      setOutTime(stringTimeToDate(localData.out_time));

      const myDate = new Date(Date.parse(localData.attendance_date));
      const todayDate = new Date(Date.now());

      if (
        !(
          myDate.getDate() === todayDate.getDate() &&
          myDate.getMonth() === todayDate.getMonth() &&
          myDate.getFullYear() === todayDate.getFullYear()
        )
      ) {
        setAddOutTime(true);
      }
    } else {
      setMessage("Add");

      setEmpNo("");
      setDate(new Date());
      setInTime(new Date());
      setOutTime(new Date());
    }
  }, [update]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: UpdateAttendanceParams = {
      id: empNo,
      date: dateToString(date),
      inTime: timeToString(new Date(inTime)),
      outTime: addOutTime ? timeToString(new Date(outTime)) : "",
    };

    const res = await updateAttendance(params);

    res
      ? MySwal({
          icon: "success",
          title: "Success!",
          text: `Attendance ${
            message == "Add" ? "added" : "updated"
          } successfully`,
          onConfirm: navigateToAttendance,
        })
      : MySwal({
          icon: "error",
          title: "Error!",
          text: `Employee ID is incorrect`,
          onConfirm: navigateToAttendance,
        });
  };

  const handleAddTimeOut = () => setAddOutTime(true);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-8 max-w-[35rem]">
      <h2>{message} Attendance</h2>
      <TextField
        label="Employee ID"
        variant="outlined"
        value={empNo}
        onChange={(e) => setEmpNo(e.target.value)}
        disabled={message == "Update"}
      />
      <MyDatePicker
        value={date}
        setValue={setDate}
        name="Date"
        disabled={message == "Update"}
      />
      <MyTimePicker value={inTime} setValue={setInTime} name="In Time" />
      {addOutTime && (
        <MyTimePicker value={outTime} setValue={setOutTime} name="Out Time" />
      )}
      {!addOutTime && (
        <div className="max-w-[10rem]">
          <MyButton
            type="button"
            onClick={handleAddTimeOut}
          >{`Add Time Out`}</MyButton>
        </div>
      )}

      <MyButton isLoading={isLoading}>{`${message} Attendance`}</MyButton>
    </form>
  );
};

export default UpdateAttendanceForm;
