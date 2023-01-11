import EmployeeDataSource from "features/attendance/data/datasource/employee_datasource";
import EmployeeModel from "../models/employee_model";

class EmployeeRepository {
  employeeDataSource: EmployeeDataSource;
  constructor() {
    this.employeeDataSource = new EmployeeDataSource();
  }

  getEmployees = async (): Promise<EmployeeModel[]> => {
    try {
      const res = await this.employeeDataSource.getEmployees();
      const attendances: EmployeeModel[] = res.data.map(
        (item: any) => new EmployeeModel(item)
      );
      return attendances;
    } catch (e) {
      return [];
    }
  };
}

export default EmployeeRepository;
