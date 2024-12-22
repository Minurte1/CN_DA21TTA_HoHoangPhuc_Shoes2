import React from "react";
import {
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { Payments } from "@mui/icons-material";
import AddressSelector from "../../user-view/components/addressUser";

const CartSummary = ({
  subtotal,
  tongTienCart,
  paymentMethods,
  selectPhuongThucThanhToan,
  setSelectPhuongThucThanhToan,
  handleSummitThanhToan,
  currentTheme,

  userInfo,
  isSwitchOn,

  selectedWards,
  setSelectedDistrict,
  setSelectedProvince,
  setSelectStreetName,
  handleSwitchChange,

  setSoDienThoai,
  soDienThoai,

  selectStreetName,
  setSelectedWards,
  selectedDistrict,
  selectedProvince,
}) => (
  <Box
    sx={{
      backgroundColor: currentTheme.backgroundColorLow,
      p: 2,
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" sx={{ color: currentTheme.color }}>
      Giỏ hàng
    </Typography>
    <Divider sx={{ my: 1, backgroundColor: "#555" }} />
    <Typography sx={{ color: currentTheme.color }}>
      {tongTienCart ? (
        <>
          {" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(tongTienCart)}
        </>
      ) : (
        <>0đ</>
      )}
    </Typography>
    <Typography sx={{ color: currentTheme.color }}>
      Các hình thức thanh toán
    </Typography>{" "}
    <FormControl sx={{ mb: 2, minWidth: 300, mt: 2 }}>
      <InputLabel
        sx={{
          display: "flex",
          alignItems: "center",
          color: currentTheme.color,
        }}
      >
        <Payments sx={{ mr: 1 }} />
        Phương thức thanh toán
      </InputLabel>
      <Select
        value={selectPhuongThucThanhToan}
        label="Icon Phương thức thanh toán"
        onChange={(e) => setSelectPhuongThucThanhToan(e.target.value)}
        sx={{ color: currentTheme.color }}
      >
        {" "}
        <MenuItem value="">Xem tất cả</MenuItem>
        {paymentMethods.map((item) => (
          <MenuItem key={item.ID_THANH_TOAN} value={item.ID_THANH_TOAN}>
            {item.PHUONG_THUC_THANH_TOAN}
          </MenuItem>
        ))}
      </Select>
    </FormControl>{" "}
    <br />
    {/* ----------------- Cmt Code địa chỉ phương thức thanh toán ------------------ */}
    {isSwitchOn ? (
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Switch
          checked={isSwitchOn} // Liên kết trạng thái với Switch
          onChange={handleSwitchChange}
          color="primary"
        />
        {userInfo && (
          <>
            <Typography
              variant="body2"
              color="white"
              sx={{ fontSize: "11px", color: currentTheme.color }}
            >
              {`Địa chỉ: ${userInfo.DIA_CHI_STREETNAME}, ${userInfo?.DIA_CHI_Wards}, 
              ${userInfo?.DIA_CHI_Districts}, ${userInfo?.DIA_CHI_Provinces}`}
            </Typography>
          </>
        )}
      </Box>
    ) : (
      <>
        <Switch
          checked={isSwitchOn} // Liên kết trạng thái với Switch
          onChange={handleSwitchChange}
          color="primary"
        />{" "}
        <Typography
          variant="body2"
          color="white"
          sx={{ fontSize: "11px", color: currentTheme.color, mb: 2 }}
        >
          {`Địa chỉ: ${selectStreetName || " "}, ${
            selectedWards?.full_name || ""
          } 
        , ${selectedDistrict?.full_name || ""},  ${
            selectedProvince?.full_name || ""
          }`}
        </Typography>
        <AddressSelector
          selectedProvince={selectedProvince}
          selectedDistrict={selectedDistrict}
          selectedWards={selectedWards}
          //
          setSelectedProvince={setSelectedProvince}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedWards={setSelectedWards}
          backgroundColor={"#343437"}
          color={"#fff"}
        />{" "}
        <TextField
          label="Tên đường"
          variant="outlined"
          value={selectStreetName} // Đảm bảo giá trị mặc định là chuỗi rỗng nếu không có dataUser hoặc EMAIL
          fullWidth
          InputProps={{
            style: { color: currentTheme.color }, // Màu chữ trong TextField
          }}
          onChange={(e) => setSelectStreetName(e.target.value)}
          InputLabelProps={{
            style: { color: currentTheme.color }, // Màu chữ nhãn
          }}
          sx={{
            mt: 2,
            backgroundColor: currentTheme.backgroundColorLow, // Màu nền của input
            "& .MuiInputLabel-root": { color: currentTheme.color }, // Màu chữ của label
            "& .MuiInputBase-input": { color: currentTheme.color }, // Màu chữ của input
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00000" }, // Màu viền
            },
            "& .MuiInputBase-root": {
              borderRadius: "4px", // Làm tròn góc nếu muốn
            },
          }}
        />{" "}
        <TextField
          label="Số điện thoại"
          variant="outlined"
          type="number"
          value={soDienThoai} // Đảm bảo giá trị mặc định là chuỗi rỗng nếu không có dataUser hoặc EMAIL
          fullWidth
          InputProps={{
            style: { color: currentTheme.color }, // Màu chữ trong TextField
          }}
          onChange={(e) => setSoDienThoai(e.target.value)}
          InputLabelProps={{
            style: { color: currentTheme.color }, // Màu chữ nhãn
          }}
          sx={{
            mt: 2,
            backgroundColor: currentTheme.backgroundColorLow, // Màu nền của input
            "& .MuiInputLabel-root": { color: currentTheme.color }, // Màu chữ của label
            "& .MuiInputBase-input": { color: currentTheme.color }, // Màu chữ của input
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00000" }, // Màu viền
            },
            "& .MuiInputBase-root": {
              borderRadius: "4px", // Làm tròn góc nếu muốn
            },
          }}
        />
      </>
    )}
    <Divider sx={{ my: 1, backgroundColor: "#555" }} />
    <Button
      variant="contained"
      onClick={() => handleSummitThanhToan()}
      sx={{
        borderRadius: "14px",
        backgroundColor: "#26bbff",
        color: "#101014",
        fontWeight: "600",

        fontSize: "12px",
        "&:hover": {
          backgroundColor: "#3ccaff",
        },
      }}
      fullWidth
    >
      Thanh toán
    </Button>
  </Box>
);

export default CartSummary;
