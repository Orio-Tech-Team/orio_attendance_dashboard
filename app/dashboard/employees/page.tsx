'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const handleStatus = (tableMeta:any,value:any) => {
        let status = value == 0 ? 1 : 0;
        console.log(tableMeta.rowData);
        console.log(status);
    }

    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "employee_name",
            label: "Employee Name",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "employee_number",
            label: "Employee No",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "created_at",
            label: "Created At",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "updated_at",
            label: "Updated At",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "actions",
            label: "Actions",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value:any = 1, tableMeta:any, updateValue:any) => (
                    <FormControl className='w-full'>
                        {/* const [status,setStatus] = useState<string>('A'); */}
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Shift"
                            onChange={(e) => {
                                updateValue(e.target.value);
                                handleStatus(tableMeta,value);
                            }}
                        >
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>In Active</MenuItem>
                        </Select>
                    </FormControl>
                )
            }
        }
    ];

    const options: any = {
        selectableRows: false,
        download: false,
        elevation: 0,
        filter: false,
        print: false,
        rowsPerPage: 100,
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}attendance-app/employee/all`);
            setData(data);
        }
        fetchEmployees();
    }, [])

    console.log(data);
    return (
        <div>
            <MUIDataTable title="Employees List" data={data} columns={columns} options={options} />
        </div>
    )
}

export default page
