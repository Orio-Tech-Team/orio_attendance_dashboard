'use client';

import {useState} from 'react';

import { TextField } from "@mui/material";
import MyButton from "@ui/MyButton";

const AddEmployeeForm = () => {
    const [employeeNo,setEmployeeNo] = useState('');
    const [employeeName,setEmployeeName] = useState('');
  return (
    <form onSubmit={()=>{}} className="flex flex-col gap-4 p-8 max-w-[35rem]">
      <h2>Add Employee</h2>
      
      <TextField
        label="Employee No"
        variant="outlined"
        value={employeeNo}
        onChange={(e) => setEmployeeNo(e.target.value)}
      />
      <TextField
        label="Employee Name"
        variant="outlined"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
      />

      <MyButton isLoading={false}>{`Add Employee`}</MyButton>
    </form>
  )
}

export default AddEmployeeForm
