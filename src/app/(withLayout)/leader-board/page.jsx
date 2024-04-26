"use client";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PrivateRoute from "../../../components/PrivateRoute";
import useAxiosSecure from "@/components/shared/Hooks/useAxiosSecure/page";
import { useQuery } from "@tanstack/react-query";

const LeaderBoard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: LeaderBoard = [], refetch } = useQuery({
    queryKey: ["LeaderBoard"],
    queryFn: async () => {
      const res = await axiosSecure(`/users`);
      return res.data;
    },
  });
  return (
    <PrivateRoute>
      <Grid px={2}>
        {" "}
        <Paper
          square={false}
          sx={{
            width: "60%",
            mx: "auto",
            textAlign: "center",
            px: 4,
            py: 2,
            my: 2,
            backgroundColor: "#cbf3f0",
          }}
          elevation={3}
        >
          <Typography variant="h4">Leader Board</Typography>
        </Paper>
        <Grid sx={{ maxWidth: 1000, mx: "auto", overflowX: "auto", border:1,borderRadius:3,my:3 }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Position</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {LeaderBoard.map((lead, index) => (
                  <TableRow
                    key={lead?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{lead?.name}</TableCell>
                    <TableCell align="center">{lead?.email}</TableCell>
                    <TableCell align="center">{lead?.points}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </PrivateRoute>
  );
};

export default LeaderBoard;
