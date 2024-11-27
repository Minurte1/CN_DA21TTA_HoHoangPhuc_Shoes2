import React, { useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
} from "@mui/material";

const MessageList = ({
  selectedUser,
  messages,
  chatContainerRef,
  inputMess,
  SendMessNe,
  setInputMess,
  userInfo,
}) => {
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);
  return (
    <Box sx={{ flex: 1, p: 3 }}>
      {selectedUser ? (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tin nhắn với {selectedUser.HO_TEN}
          </Typography>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Tin nhắn */}
            <Box
              sx={{
                flex: 1,
                padding: 0,
                overflowY: "auto",
                height: "100%", // Đảm bảo chiều cao đủ lớn
              }}
              ref={chatContainerRef}
            >
              {messages.map((message) => (
                <Box
                  key={message._id}
                  sx={{
                    marginBottom: 2,

                    display: "flex",
                    justifyContent:
                      message.ID_NGUOI_DUNG === userInfo.ID_NGUOI_DUNG
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  {" "}
                  <Typography variant="caption" sx={{ textAlign: "right" }}>
                    {new Date(message.NGAY_TAO_TIN_NHAN).toLocaleString()}
                  </Typography>
                  <Box
                    sx={{
                      color: "#fff",

                      maxWidth: "80%",
                      padding: 1,
                      backgroundColor:
                        message.ID_NGUOI_DUNG === userInfo.ID_NGUOI_DUNG
                          ? "#0084ff"
                          : "#303030",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1">
                      {message.NOI_DUNG_TINNHAN}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Input để gửi tin nhắn */}
            <Box
              sx={{
                padding: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Nhập tin nhắn..."
                value={inputMess}
                onChange={(e) => setInputMess(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && SendMessNe()}
                sx={{
                  width: "75%",
                  height: "75%",
                  backgroundColor: "#3a3b3c",
                  borderRadius: "25px",
                  marginLeft: "15px",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#3a3b3c",
                    borderRadius: "25px",
                    height: "100%",
                    paddingLeft: "15px",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "white",
                    paddingLeft: "15px",
                    width: "90%",
                    height: "100%",
                    outline: "none",
                    border: "none",
                    backgroundColor: "transparent",
                  },
                }}
              />

              <IconButton onClick={SendMessNe} sx={{ marginLeft: 2 }}>
                <img
                  src="https://static.xx.fbcdn.net/images/emoji.php/v9/tde/1.5/20/1f433.png"
                  alt="🐳"
                />
              </IconButton>
            </Box>
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="white">
          Vui lòng chọn người dùng để xem tin nhắn.
        </Typography>
      )}
    </Box>
  );
};

export default MessageList;
