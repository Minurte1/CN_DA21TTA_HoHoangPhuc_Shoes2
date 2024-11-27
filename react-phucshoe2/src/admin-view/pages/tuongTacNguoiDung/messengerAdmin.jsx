import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios
import { Box, IconButton, TextField } from "@mui/material";
import { io } from "socket.io-client"; // Import socket.io client
import Sidebar from "./component/navbarMess";
import MessageList from "./component/messengerList";
import { useDispatch, useSelector } from "react-redux";
import { Co2Sharp } from "@mui/icons-material";

const MessengerAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const { isAuthenticated, userInfo, itemCart, totalCart } = useSelector(
    (state) => state.auth
  );
  const api = process.env.REACT_APP_URL_SERVER;
  const [socket, setSocket] = useState(null);
  const chatContainerRef = useRef(null);
  const [username, setUsername] = useState("");
  const [IdAdminChat, setIdAdminChat] = useState("");
  const [inputMess, setInputMess] = useState(""); // Declare state for message input

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io("http://localhost:3002");
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected with ID:", newSocket.id);
        newSocket.emit("user_connected", username);
      });

      newSocket.on("receive_message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      newSocket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      return () => {
        newSocket.disconnect();
        console.log("Socket disconnected on cleanup");
      };
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${api}/user`);
        setUsers(response.data.DT);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [selectedUser]);
  const fetchMessages = async () => {
    try {
      const response = await axios.post(`${api}/tin-nhan/messages-admin`, {
        idNguoiGui: userInfo.ID_NGUOI_DUNG,
        idNguoiNhan: selectedUser.ID_NGUOI_DUNG,
      });
      setMessages(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy tin nhắn:", error);
    }
  };

  const handleIconCaVoi = async () => {
    if (IdAdminChat) {
      try {
        const response = await axios.post(`${api}/tin-nhan/send`, {
          idNguoiGui: username,
          idNguoiNhan: 1,
          noiDungTinNhan: "🐳",
        });

        if (response.data.EC === 1) {
          fetchMessages();
          //   setTinNhan((prevMessages) => [...prevMessages, response.data.DT]);
          setInputMess("");
        } else {
          console.error("Gửi tin nhắn thất bại:", response.data.EM);
        }
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
      }
    } else {
      console.warn("Chưa xác định IdAdminChat!");
    }
  };

  const SendMessNe = async () => {
    if (!inputMess) return;

    try {
      const response = await axios.post(`${api}/tin-nhan/send-admin`, {
        idNguoiGui: userInfo.ID_NGUOI_DUNG,
        noiDungTinNhan: inputMess,
        idNguoiNhan: selectedUser.ID_NGUOI_DUNG,
      });

      if (response.data.EC === 1) {
        fetchMessages();
        // setMessages((prevMessages) => [...prevMessages, response.data.DT]);
      } else {
        console.error("Gửi tin nhắn thất bại:", response.data.EM);
      }

      setInputMess("");
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };

  const handlePressEnter = async (event) => {
    if (event.charCode === 13) {
      await SendMessNe();
      event.preventDefault();
    }
  };
  //   useEffect(() => {
  //     if (chatContainerRef.current) {
  //       chatContainerRef.current.scrollTop =
  //         chatContainerRef.current.scrollHeight;
  //     }
  //   }, [messages, selectedUser]);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
      />
      <MessageList
        selectedUser={selectedUser}
        messages={messages}
        SendMessNe={SendMessNe}
        handlePressEnter={handlePressEnter}
        handleIconCaVoi={handleIconCaVoi}
        chatContainerRef={chatContainerRef}
        inputMess={inputMess}
        setInputMess={setInputMess}
        userInfo={userInfo}
      />
    </Box>
  );
};

export default MessengerAdmin;
