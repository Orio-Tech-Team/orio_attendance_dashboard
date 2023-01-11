import { AxiosResponse } from "axios";
import UpdateAttendanceParams from "features/attendance/data/params/update_attendance_params";
import Axios from "shared/network/network";
import ReportParams from "../params/report_params";

class AttendanceDataSource {
  getAttendance = async (date: String): Promise<AxiosResponse> => {
    try {
      const res = await Axios.fetch({
        method: "POST",
        url: "attendance-app/attendance/getattendancedata",
        data: {
          from_date: date,
          to_date: date,
        },
      });
      return res;
    } catch (e) {
      throw e;
    }
  };

  updateAttendance = async (
    params: UpdateAttendanceParams
  ): Promise<AxiosResponse> => {
    try {
      const res = await Axios.fetch({
        method: "POST",
        url: "attendance-app/attendance/manual",
        data: {
          emp_id: params.id,
          date: params.date,
          in_time: params.inTime,
          out_time: params.outTime,
        },
      });
      return res;
    } catch (e) {
      throw e;
    }
  };

  attendanceReport = async (params: ReportParams) => {
    try {
      const res = await Axios.fetch({
        method: "POST",
        url: "attendance-app/attendance/get-attendance-data",
        data: {
          from_date: params.from_date,
          to_date: params.to_date,
          employee_number: params.employee_number,
        },
      });
      return res;
    } catch (e) {
      throw e;
    }
  };
}

export default AttendanceDataSource;
