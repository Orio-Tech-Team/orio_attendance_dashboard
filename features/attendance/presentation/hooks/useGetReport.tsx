import AttendanceModel from "features/attendance/domain/models/attendance_model";
import AttendanceRepository from "features/attendance/domain/repository/attendance_repository";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModeIcon from "@mui/icons-material/Mode";
import Chip from "@mui/material/Chip";
import ReportParams from "features/attendance/data/params/report_params";
import { dateToString } from "shared/utils/date_time";

type chipTypes =
  | "success"
  | "warning"
  | "error"
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | undefined;

const chipType = (type: string): chipTypes => {
  if (type == "Present") return "success";
  if (type == "Late") return "warning";
  return "error";
};

const useGetReport = (fromDate: Date, toDate: Date, empId: number) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [present, setPresent] = useState<number>(0);
  const [absent, setAbsent] = useState<number>(0);
  const [leave, setLeave] = useState<number>(0);

  const attendanceRepository = new AttendanceRepository();

  const getAttendance = async () => {
    setIsLoading(true);
    const params: ReportParams = {
      from_date: dateToString(new Date(fromDate)),
      to_date: dateToString(new Date(toDate)),
      employee_number: empId.toString(),
    };
    const res: AttendanceModel[] = await attendanceRepository.attendanceReport(
      params
    );
    setPresent(0);
    setAbsent(0);
    setLeave(0);
    const newData = res
      .sort((a, b) => (a.type > b.type ? -1 : 1))
      .map((item) => {
        if (item.type == "Present") setPresent((p) => p + 1);
        else if (item.type == "Absent") setAbsent((a) => a + 1);
        else if (item.type == "Late") setLeave((l) => l + 1);
        const chipColor = chipType(item.type);
        return [
          item.employeeNumber,
          item.employeeName,
          item.attendanceDate,
          item.inTime,
          item.outTime,
          item.workingHour,
          <Chip
            key={item.employeeNumber}
            label={item.type}
            color={chipColor}
          />,
          item.shift,
        ];
      });
    setData(newData);
    setIsLoading(false);
    return res;
  };

  return { data, isLoading, getAttendance, present, absent, leave };
};

export default useGetReport;
