"use client";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PrivateRoute from "../../../components/PrivateRoute";
import useAxiosSecure from "@/components/shared/Hooks/useAxiosSecure/page";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

const LeaderBoard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: LeaderBoard = [], refetch } = useQuery({
    queryKey: ["LeaderBoard"],
    queryFn: async () => {
      const res = await axiosSecure(`/users`);
      return res.data;
    },
  });
  const data = useMemo(() => LeaderBoard, [LeaderBoard]);
  /** @type import("@tanstack/react-table").ColumnDef<any>*/
  const columns = [
    { header: "Position" },
    {
      header: "Name",
    },
    {
      header: "Email",
    },
    {
      header: "Points",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <PrivateRoute>
      <Grid className="w3-container">
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
        <Grid sx={{ maxWidth: 1000, mx: "auto", overflowX: "auto" }}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {LeaderBoard.map((lead, index) => (
                <>
                  <TableRow key={lead._id}>
                    <th>{index + 1}</th>
                    <th>{lead?.name}</th>
                    <th>{lead?.email}</th>
                    <th>{lead?.points} </th>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </PrivateRoute>
  );
};

export default LeaderBoard;
