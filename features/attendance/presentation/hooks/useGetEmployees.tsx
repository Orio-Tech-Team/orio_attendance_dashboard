import EmployeeModel from "features/attendance/domain/models/employee_model";
import EmployeeRepository from "features/attendance/domain/repository/employee_repository";
import { useEffect, useState } from "react";

const useGetEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);

  useEffect(() => {
    const employeeRepository = new EmployeeRepository();

    const getEmployees = async () => {
      const res: EmployeeModel[] = await employeeRepository.getEmployees();
      console.log(res);
      setEmployees(res);
    };

    getEmployees();
  }, []);

  return employees;
};

export default useGetEmployees;
