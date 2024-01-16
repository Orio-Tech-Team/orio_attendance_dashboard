'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

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
        }
    }
];

const page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

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
            <MUIDataTable title="" data={data} columns={columns} options={options} />
        </div>
    )
}

export default page
