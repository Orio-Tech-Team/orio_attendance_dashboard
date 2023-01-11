class EmployeeModel {
  employeeNumber: string;
  employeeName: string;

  constructor(json: any) {
    this.employeeNumber = json.employee_number;
    this.employeeName = json.employee_name;
  }
}

export default EmployeeModel;
