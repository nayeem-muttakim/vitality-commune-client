"use client";
import { Textarea } from "@mui/joy";
import Select from "react-select";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
const Create = () => {
  const options = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Fish", label: "Fish" },
    { value: "Hamster", label: "Hamster" },
    { value: "Parrot", label: "Parrot" },
    { value: "Rabbit", label: "Rabbit" },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Box px={1}>
      <Paper
        square={false}
        sx={{
          px: 4,
          py: 2,
          my: 2,
          mx: "auto",
          backgroundColor: "#cbf3f0",
        }}
        elevation={3}
      >
        <Typography variant="h4">Create Challenge</Typography>
      </Paper>
      <form>
        <Grid
          sx={{
            display: "grid",
            gap: 2,
            p: 5,
            maxWidth: 600,
            mx: "auto",
            my: 10,
          }}
        >
          <TextField label="Title" name="title" required />
          <Textarea
            minRows={3}
            maxRows={3}
            name="description"
            placeholder="Description"
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              slots={{ field: SingleInputDateRangeField }}
              name="date_range"
              label="Data Range"
              calendars={3}
            />
          </LocalizationProvider>
          <Select
            required
            placeholder="Challenge Type"
            name="type"
            options={options}
            onChange={setSelectedOption}
            defaultValue={selectedOption}
          />
          <Button type="submit" variant="contained">
            Save and Publish
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default Create;
