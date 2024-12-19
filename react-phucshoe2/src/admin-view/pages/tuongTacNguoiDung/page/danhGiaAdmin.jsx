import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { getThemeConfig } from "../../../../services/themeService";

const apiPython = process.env.SERVER_PYTHON;
const api = process.env.REACT_APP_URL_SERVER;

const KichCoManager = () => {
  const [kichCoList, setKichCoList] = useState([]);
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");

  useEffect(() => {
    fetchKichCoList();
  }, []);

  const fetchKichCoList = async () => {
    try {
      const response = await axios.post(`${apiPython}/analyze_reviews`);
      if (response.data.EC === 1) {
        setKichCoList(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching kich co:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          DANH SÁCH KÍCH CỠ
        </Typography>
      </Box>
      <Divider sx={{ my: 1, color: "#000", width: "100%" }} />
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: currentTheme.backgroundColor }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.colorTitle }}>ID</TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                Tên Kích Cỡ
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                Ngày Tạo
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                Ngày Cập Nhật
              </TableCell>
              <TableCell sx={{ color: currentTheme.colorTitle }}>
                Trạng Thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kichCoList.map((kichCoItem) => (
              <TableRow key={kichCoItem.ID_KICH_CO}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {kichCoItem.ID_KICH_CO}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {kichCoItem.KICH_CO}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(kichCoItem.CREATED_KICH_CO).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {moment(kichCoItem.UPDATE_KICH_CO).format(
                    "HH:mm:ss - DD/MM/YYYY"
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      kichCoItem.TRANG_THAI_KICH_CO === "1" ? "#008000" : "red",
                  }}
                >
                  {kichCoItem.TRANG_THAI_KICH_CO === "1"
                    ? "Đang sử dụng"
                    : "Ngưng sử dụng"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default KichCoManager;
