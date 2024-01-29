import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import BarIcon from "./assets/audio/icons/barIcon";
import { data } from "./data";

function Menu({ remainingData, setPrizeNumber, setOpenModal }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenModal = (currentElement) => {
    const index = data.findIndex(
      (item) => item.option === currentElement.option
    );
    setOpenModal(true);
    setPrizeNumber(index);
    setOpen(false);
  };
  return (
    <div>
      <Box sx={{ position: "fixed", top: "10px", right: "10px" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <BarIcon />
        </IconButton>
      </Box>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <Box sx={{ width: "400px", py: 3 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Danh sách câu hỏi" {...a11yProps(0)} />
            <Tab label="Câu hỏi còn lại" {...a11yProps(1)} />
          </Tabs>

          <CustomTabPanel value={value} index={0}>
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {data.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    onClick={() => handleOpenModal(item)}
                  >
                    <ListItemText primary={item.option} />
                  </ListItemButton>
                );
              })}
            </List>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {remainingData.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    onClick={() => handleOpenModal(item)}
                  >
                    <ListItemText primary={item.option} />
                  </ListItemButton>
                );
              })}
            </List>
          </CustomTabPanel>
        </Box>
      </Drawer>
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Menu;
