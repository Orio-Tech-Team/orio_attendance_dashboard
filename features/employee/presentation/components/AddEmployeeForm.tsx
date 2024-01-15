'use client';

import { useState } from 'react';

import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import MyButton from "@ui/MyButton";
import MySelect from 'shared/components/MySelect';
import axios from 'axios';
import { exit } from 'process';
import { NextResponse } from 'next/server';
import { useToken } from '../hooks/useToken';

const AddEmployeeForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployee, setIsEmployee] = useState(true);
  const [referenceNo, setReferenceNo] = useState('');
  const roleId = 1;
  const [shift, setShift] = useState(1);
  const [station, setStation] = useState("HO");

  const createUser = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_USER}/user`, {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email,
        user_name: username,
        password: password,
        is_employee: isEmployee,
        refrence_number: referenceNo,
        roleId
      });

      if (response.status == 201) {
        console.log("User Created!");
        return response.data;
      }

    } catch (error) {
      console.log(error);
    }
  }

  const userLogin = async () => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_USER}/auth/login`, {
        user_name: username,
        password: password,
        application_tag: "ORIO-ATT-APP"
      });

      console.log("Login Successfull");
      return data.token;

    } catch (error) {
      console.log(error);
      exit(1);
    }
  }

  const createEmployee = async (token: any) => {
    try {
      const { data } = await axios.post(`http://localhost:5003/attendance-app/employee/create`, {
        employeeName: `${firstName} ${lastName}`,
        employeeNo: referenceNo,
        shiftId: shift
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (data.status == 200) {
        console.log("Employee Created!");
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createEmployeeStation = async (token: any) => {
    try {
      const { data } = await axios.post(`http://localhost:5003/attendance-app/employee/create-employee-station`, {
        employeeStation: station,
        employeeNo: referenceNo,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })

      if (data) {
        console.log("Employee Station Created!");
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await createUser();
    const token = await userLogin();
    
    const hookToken = useToken();
    hookToken.onCreate(token);

    const data = await createEmployee(token);

    if (data) {
      await createEmployeeStation(token);
    }

  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-8 w-full">
      <h2>Add Employee</h2>
      <div className='max-w-[35rem] grid grid-cols-2 gap-4'>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => { setPhone(e.target.value) }}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <TextField
          label="Reference Number"
          variant="outlined"
          value={referenceNo}
          onChange={(e) => { setReferenceNo(e.target.value) }}
        />
        <FormControl className=''>
          <InputLabel id="demo-simple-select-label">Shift</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={shift}
            label="Shift"
            onChange={(e) => { setShift(Number(e.target.value)) }}
          >
            <MenuItem value={1}>10:00:00 - 18:00:00</MenuItem>
            <MenuItem value={2}>10:00:00 - 06:00:00</MenuItem>
            <MenuItem value={3}>21:00:00 - 06:00:00</MenuItem>
          </Select>
        </FormControl>
        <FormControl className=''>
          <InputLabel id="demo-simple-select-label">Stations</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={station}
            label="Station"
            onChange={(e) => { setStation(e.target.value) }}
          >
            <MenuItem value={"HO"}>Head Office</MenuItem>
            <MenuItem value={"JGI"}>J G I</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel control={<Checkbox checked={isEmployee} onChange={() => setIsEmployee(prevState => !prevState)} />} label="Is Employee" />
      </div>
      <MyButton isLoading={false}>{`Add Employee`}</MyButton>
    </form>
  )
}

export default AddEmployeeForm
