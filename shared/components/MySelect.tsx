import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";

import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  className?: string;
  label: string;
  items: any[];
  setItem: Dispatch<SetStateAction<number>>;
}

const MySelect = ({ className, label, items, setItem }: Props) => {
  return (
    <FormControl fullWidth className={`${className}`}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={items.map(
          (option) => option["employeeNumber"] + " - " + option["employeeName"]
        )}
        onChange={(e, value) => {
          const emp = value?.replaceAll(" ", "").split("-");
          if (emp && emp.length > 0) {
            setItem(+emp![0]);
            console.log(+emp![0]);
          }
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </FormControl>
  );
};

export default MySelect;
