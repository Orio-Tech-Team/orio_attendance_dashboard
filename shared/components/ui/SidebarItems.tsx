import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  drawerToggle: () => void;
}

const SidebarItems = ({ drawerToggle }: Props) => {
  const router = useRouter();

  const items = [
    {
      name: "Attendance",
      icon: <AssignmentTurnedInIcon />,
      link: "/dashboard",
    },
    {
      name: "Add Attendance",
      icon: <AddBoxIcon />,
      link: "/dashboard/add-attendance",
    },
    {
      name: "Employee Report",
      icon: <AssessmentIcon />,
      link: "/dashboard/employee-report",
    },
    {
      name: "Add Employee",
      icon: <PersonAddIcon />,
      link: "/dashboard/add-employee",
    },
    {
      name: "Employees List",
      icon: <ViewStreamIcon />,
      link: "/dashboard/employees",
    },
  ];

  const onClick = (link: string) => {
    drawerToggle();
    router.push(link);
  };

  return (
    <div>
      <Toolbar className="w-full flex justify-center items-center">
        <Image 
        src={"http://cwms.testgrid.co:3000/pharm_logo.svg"} 
        alt="logo" 
        unoptimized
        width={100}
        height={100}
        />
      </Toolbar>
      <div className=""></div>
      <Divider/>
      <List sx={{
        height:"89vh"
      }}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => onClick(item.link)}
          >
            <ListItemButton >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SidebarItems;
