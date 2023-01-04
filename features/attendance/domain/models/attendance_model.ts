class AttendanceModel {
  employeeNumber: string;
  employeeName: string;
  attendanceDate: string;
  inTime: string;
  outTime: string;
  workingHour: string;
  type: string;
  shift: string;

  constructor(json: any) {
    this.employeeNumber = json.employee_number;
    this.employeeName = json.employee_name;
    this.attendanceDate = json.attendance_date;
    this.inTime = json.intime != 0 ? json.intime : "00:00";
    this.outTime = json.outtime != 0 ? json.outtime : "00:00";
    this.workingHour = json.working_hours != 0 ? json.working_hours : "00:00";
    this.type = json.type;
    this.shift = json.shift;
  }
}

export default AttendanceModel;
