import { useState, useEffect, useRef } from "react";
import "./ChatRealTime.css";
import "./Chat.css";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../../../public/logo/favicon.png";
import { useDispatch, useSelector } from "react-redux";
const ENDPOINT = "http://localhost:3002"; // Địa chỉ của server Node.js

const ChatRealTime = () => {
  const [IsOpenChat, setIsOpenChat] = useState(false);
  const [inputMess, setinputMess] = useState("");
  const [NguoiMaBanMuonNhanTin, setNguoiMaBanMuonNhanTin] = useState();
  const [IdCoversation, setIdCoversation] = useState("");
  const { isAuthenticated, userInfo, itemCart, totalCart } = useSelector(
    (state) => state.auth
  );
  const [idValue, setidValue] = useState(null);
  const [socket, setSocket] = useState(null);
  const token = sessionStorage.getItem("accessToken");
  const [TinNhan, setTinNhan] = useState([]);

  const [ImageUserWantMess, setImageUserWantMess] = useState();
  const chatContainerRef = useRef(null);

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [IdAdminChat, setIdAdminChat] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.taikhoan);
        console.log("check", username);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  useEffect(() => {
    // Kết nối tới Socket.IO
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    // Khi socket kết nối thành công, thông báo userId cho server
    newSocket.emit("user_connected", username);

    // Lắng nghe tin nhắn mới từ server
    newSocket.on("receive_message", (message) => {
      console.log("Tin nhắn mới:", message);
      setTinNhan((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect(); // Ngắt kết nối khi component bị hủy
    };
  }, [username]);

  const handleIconCaVoi = async () => {
    if (IdCoversation) {
      try {
        const response = await axios.post(`${ENDPOINT}/tin-nhan/send`, {
          idNguoiGui: username, // ID người gửi
          idNguoiNhan: 1, // ID người nhận (bạn cần xác định receiverId trong context của bạn)
          noiDungTinNhan: "🐳", // Nội dung tin nhắn
        });

        // Nếu gửi thành công
        if (response.data.EC === 1) {
          // Thêm tin nhắn vào danh sách
          setTinNhan((prevMessages) => [...prevMessages, response.data.DT]);
          setinputMess(""); // Xóa nội dung input
        } else {
          console.error("Gửi tin nhắn thất bại:", response.data.EM);
        }
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
      }
    } else {
      console.warn("Chưa xác định IdCoversation!");
    }
  };

  const SendMessNe = async () => {
    if (!inputMess) {
      return; // Không làm gì nếu không có nội dung tin nhắn
    }

    console.log("Check username:", username);
    console.log("Check conversation ID:", IdCoversation);

    if (IdCoversation) {
      try {
        // Gửi tin nhắn tới backend
        const response = await axios.post(`${ENDPOINT}/tin-nhan/send`, {
          idNguoiGui: username, // ID người gửi
          idNguoiNhan: 1, // ID người nhận (bạn cần cung cấp giá trị này từ context)
          noiDungTinNhan: inputMess, // Nội dung tin nhắn
        });

        if (response.data.EC === 1) {
          // Gửi thành công, thêm tin nhắn mới vào danh sách
          setTinNhan((prevMessages) => [...prevMessages, response.data.DT]);
          console.log("Tin nhắn mới:", response.data.DT);
        } else {
          console.error("Gửi tin nhắn thất bại:", response.data.EM);
        }

        // Xóa nội dung nhập
        setinputMess("");
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
      }
    } else {
      console.warn("Không tìm thấy IdCoversation!");
    }
  };

  const handlePressEnter = async (event) => {
    if (event.charCode === 13) {
      await SendMessNe();
      event.preventDefault();
    }
  };

  const handleUserIb = async () => {
    console.log("check username KH", username);
    try {
      const response = await axios.get(
        `http://localhost:3002/api/getUserByUsername/${username}`
      );
      const { userId } = response.data;
      setUserId(userId);
      // console.log('check id user', userId)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User not found");
      } else {
        console.log("An error occurred during the search.");
      }
    }
    const usernameAdmin = "admin";
    try {
      const response = await axios.get(
        `http://localhost:3002/api/getUserByUsername/${usernameAdmin}`
      );
      const { userId } = response.data;
      setIdAdminChat(userId);
      console.log("check id user", userId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User not found");
      } else {
        console.log("An error occurred during the search.");
      }
    }
    try {
      if ((IdAdminChat, userId)) {
        // Gửi yêu cầu POST đến server
        const response = await axios.post(
          "http://localhost:3002/api/createConversation",
          {
            participants: [IdAdminChat, userId], // Truyền id của user đó xuống server
          }
        );
        setIdCoversation(response.data.conversationId);
        console.log("id conver =>", IdCoversation);
      }
      if (IdCoversation) {
        const responseMess = await axios.post(
          "http://localhost:3002/api/getMessages",
          {
            conversationId: IdCoversation,
          }
        );
        setTinNhan(responseMess.data);

        console.log("check tin nhắn1 =>", responseMess.data);
      }

      console.log("Tạo cuộc trò chuyện thành công");
    } catch (error) {
      console.error("Lỗi khi tạo cuộc trò chuyện:", error);
    }
  };

  const handleOpenChat = () => {
    setIsOpenChat(!IsOpenChat);
    handleUserIb();
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [TinNhan]);

  return (
    <>
      <div className="container-chat">
        {!IsOpenChat ? (
          <div className="iconCLickChat" onClick={handleOpenChat}>
            <img
              className="iconCLickChat-chat-avt-img"
              src={logo}
              alt="Avatar"
            />
          </div>
        ) : (
          false
        )}

        {IsOpenChat ? (
          <div className="containe-chat-realtime">
            <div className="containe-chat-realtime-top">
              <div className="chat-avt">
                <img className="chat-avt-img" src={logo} alt="Avatar" />
              </div>
              <div className="chat-name">
                <p>PhucShoe</p>
              </div>
              <div className="chat-off">
                <i className="fa-solid fa-minus" onClick={handleOpenChat}></i>
              </div>
            </div>
            <div className="container-chat-realtime-noidungmess">
              <div className="chat-container" ref={chatContainerRef}>
                {TinNhan.map((message) => (
                  <div key={message._id} className="message">
                    <div
                      className={`container-messs ${
                        message.name !== NguoiMaBanMuonNhanTin
                          ? "text-align-right justify-content-right"
                          : ""
                      }`}
                    >
                      <div className="container-messCha2">
                        {message.username !== NguoiMaBanMuonNhanTin && (
                          <div className="container-noidungtinnhan2 text-align-right">
                            <p className="noidungtinnhan2">{message.message}</p>
                          </div>
                        )}
                      </div>
                      <div className="container-messCha">
                        <img
                          className={`NoiDungChat-NoiDung-1-TinNhan-Avt ${
                            message.name === NguoiMaBanMuonNhanTin
                              ? "image-Avta"
                              : "display-none"
                          }`}
                          src={`http://localhost:3002/public/uploads/${ImageUserWantMess}`}
                        />
                        {message.username === NguoiMaBanMuonNhanTin && (
                          <div className="container-noidungtinnhan">
                            <p className="noidungtinnhan">{message.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="container-chat-realtime-send">
              <div className="NoiDungChat-thanhChat-Input">
                <input
                  className="NoiDungChat-thanhChat-Input-1"
                  placeholder="Aa"
                  type="text"
                  value={inputMess}
                  onChange={(e) => setinputMess(e.target.value)}
                  onKeyPress={(event) => handlePressEnter(event)}
                ></input>
              </div>
              <div className="NoiDungChat-thanhChat-3">
                <img
                  onClick={handleIconCaVoi}
                  className="CavoiCute"
                  alt="🐳"
                  src="https://static.xx.fbcdn.net/images/emoji.php/v9/tde/1.5/20/1f433.png"
                ></img>
              </div>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    </>
  );
};

export default ChatRealTime;
