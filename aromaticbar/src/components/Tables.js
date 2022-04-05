import React, { useState, useEffect } from "react";
import "../assets/css/Table.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { tablehead } from "./Data";
const Tables = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/aromaticapi/controller/getfeed.php")
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { status, msg, feed = [] } = data;
  // console.log(feed, msg, status)
  return (
    <>
      <br />
      <div className="tablesec">
        <h1>All Feedback</h1>
        {isLoading ? (
          <h2 style={{ color: "blue" }}>Loading...</h2>
        ) : (
          <div className="tableContent">
            {feed === null ? (
              <h3 style={{ fontWeight: "bold", color: "red" }}>
                No Data found
              </h3>
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {tablehead.map((item, index) => {
                        return (
                          <TableCell
                            align="center"
                            key={index}
                            style={{
                              fontWeight: "bold",
                              color: "rgba(49, 49, 216, 0.74)",
                              letterSpacing: "1.1px",
                              fontSize: "15px",
                            }}
                          >
                            {item}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {feed.map((feeds, i) => {
                      return (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{feeds.Cname}</TableCell>
                          <TableCell align="center">{feeds.Cemail}</TableCell>
                          <TableCell align="center">{feeds.Cmob}</TableCell>
                          <TableCell align="center">{feeds.q1}</TableCell>
                          <TableCell align="center">{feeds.q2}</TableCell>
                          <TableCell align="center">{feeds.q3}</TableCell>
                          <TableCell align="center">{feeds.q4}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Tables;
