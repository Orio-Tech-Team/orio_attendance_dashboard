import { AxiosResponse } from "axios";
import Axios from "shared/network/network";

class EmployeeDataSource {
  getEmployees = async (): Promise<AxiosResponse> => {
    try {
      const res = await Axios.fetch({
        url: "attendance-app/employee/get-employee",
      });
      return res;
    } catch (e) {
      throw e;
    }
  };
}

export default EmployeeDataSource;
