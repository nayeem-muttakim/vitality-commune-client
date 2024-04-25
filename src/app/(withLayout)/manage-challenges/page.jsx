"use client";
import { useState } from "react";
import PrivateRoute from "../../../components/PrivateRoute";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Create from "../../../components/Create/Create";
import Manage from "../../../components/Manage/Manage";

const ManageChallenges = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <PrivateRoute>
      <Box sx={{ width: {xs:'100%',sm:"80%",lg:"60%"}, mx: "auto", textAlign: "center" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              centered
              aria-label="lab API tabs example"
            >
              <Tab label="Create" value="1" />
              <Tab label="Manage" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Create />
          </TabPanel>
          <TabPanel value="2">
            <Manage />
          </TabPanel>
        </TabContext>
      </Box>
    </PrivateRoute>
  );
};

export default ManageChallenges;
