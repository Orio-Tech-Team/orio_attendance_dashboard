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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      icon: <PersonAddAltIcon />,
      link: "/dashboard/add-employee",
    },
  ];

  const onClick = (link: string) => {
    drawerToggle();
    router.push(link);
  };

  return (
    <div>
      <Toolbar className="bg-primary"/>
      <div className=""></div>
      <Divider className="bg-primary"/>
      <List className="bg-primary" sx={{
        height:"89vh"
      }}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => onClick(item.link)}
            sx={{
              color:"white"
            }}
          >
            <ListItemButton >
              <ListItemIcon sx={{
              color:"white"
            }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SidebarItems;
