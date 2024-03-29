import AttendanceDataSource from "features/attendance/data/datasource/attendance_datasource";
import ReportParams from "features/attendance/data/params/report_params";
import UpdateAttendanceParams from "features/attendance/data/params/update_attendance_params";
import AttendanceModel from "../models/attendance_model";

class AttendanceRepository {
  attendanceDataSource: AttendanceDataSource;
  constructor() {
    this.attendanceDataSource = new AttendanceDataSource();
  }

  getAttendance = async (date: string): Promise<AttendanceModel[]> => {
    try {
      const res = await this.attendanceDataSource.getAttendance(date);
      const attendances: AttendanceModel[] = res.data.map(
        (item: any) => new AttendanceModel(item)
      );
      return attendances;
    } catch (e) {
      return [];
    }
  };

  updateAttendance = async (
    params: UpdateAttendanceParams
  ): Promise<boolean> => {
    try {
      const res = await this.attendanceDataSource.updateAttendance(params);
      return true;
    } catch (e) {
      return false;
    }
  };

  attendanceReport = async (
    params: ReportParams
  ): Promise<AttendanceModel[]> => {
    try {
      const res = await this.attendanceDataSource.attendanceReport(params);
      const attendances: AttendanceModel[] = res.data.map(
        (item: any) => new AttendanceModel(item)
      );
      return attendances;
    } catch (e) {
      return [];
    }
  };
}

export default AttendanceRepository;
