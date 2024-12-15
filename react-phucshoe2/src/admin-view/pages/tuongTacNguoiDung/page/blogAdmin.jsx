import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { enqueueSnackbar } from "notistack";
const modules = {
  toolbar: [
    // Tùy chỉnh tiêu đề
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // Kiểu chữ
    [{ font: [] }],
    // Kích thước chữ
    [{ size: [] }],
    // Định dạng văn bản
    ["bold", "italic", "underline", "strike"], // In đậm, nghiêng, gạch chân, gạch ngang
    [{ color: [] }, { background: [] }], // Màu chữ và màu nền
    [{ script: "sub" }, { script: "super" }], // Chỉ số trên/dưới
    [{ list: "ordered" }, { list: "bullet" }], // Danh sách
    [{ indent: "-1" }, { indent: "+1" }], // Thụt lề
    [{ align: [] }], // Căn lề
    ["link", "image", "video"], // Link, ảnh, video
    ["blockquote", "code-block"], // Trích dẫn, đoạn mã
    ["clean"], // Xóa định dạng
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "blockquote",
  "code-block",
];

const BlogManager = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null); // Để lưu trữ ID của bài viết khi chỉnh sửa

  const [images, setImages] = useState(null);
  const [descriptionTitle, setDecripttionTitle] = useState("");
  // Hàm xử lý lưu bài viết mới
  const handleSave = async () => {
    const formData = new FormData();

    try {
      if (editId) {
        // Truyền dữ liệu cập nhật vào formData
        formData.append("content", content);

        // Gửi yêu cầu PUT để cập nhật
        const response = await axios.put(
          `${api}/bai-viet/${editId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.data.EC === 1) {
          enqueueSnackbar(response.data.EM, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.EM, { variant: "error" });
        }
      } else {
        // Truyền dữ liệu tạo mới vào formData
        formData.append("NOI_DUNG_BAIVIET", content);
        formData.append("TIEU_DE", title);
        formData.append("ID_NGUOI_DUNG", userInfo.ID_NGUOI_DUNG);
        formData.append("HINH_ANH_BAIVIET", images); // Hình ảnh
        formData.append("NOI_DUNG_TIEU_DE", descriptionTitle);

        // Gửi yêu cầu POST để tạo mới
        const response = await axios.post(`${api}/bai-viet`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.EC === 1) {
          enqueueSnackbar(response.data.EM, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.EM, { variant: "error" });
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save content");
      enqueueSnackbar(error.response.data.EM, { variant: "error" });
    }
  };

  // Hàm xử lý xóa bài viết
  const handleDelete = async (id) => {
    try {
      // Gửi yêu cầu xóa bài viết
      const response = await axios.delete(`/bai-viet/${id}`);
      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" });
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete content");
    }
  };

  // Hàm tải bài viết để chỉnh sửa
  const handleEdit = async (id) => {
    try {
      // Tải bài viết để chỉnh sửa
      const response = await axios.get(`/bai-viet/${id}`);
      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" });
        setEditId(id);
        setContent(response.data.content);
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load content");
    }
  };

  // Hàm tải danh sách bài viết
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("/api/posts")
  //     .then((response) => {
  //       setPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       alert("Failed to load posts");
  //     });
  // }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImages(e.target.files[0]);
    }
  };
  const handleQuillChange = (value) => {
    setContent(value);
  };
  return (
    <Container>
      <h2>Blog Editor</h2>
      <TextField
        fullWidth
        label="Tiêu đề bài viết"
        name="title"
        value={title || ""}
        sx={{ width: "400px" }}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />

      <TextField
        multiline
        margin="dense"
        label="Nôi dung tiêu đề"
        type="text"
        fullWidth
        name="NOI_DUNG_TIEU_DE"
        minRows={5}
        // sx={{ width: "400px" }}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setDecripttionTitle(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Hình ảnh bài viết"
        type="file"
        fullWidth
        name="images"
        sx={{ width: "400px" }}
        InputLabelProps={{ shrink: true }}
        onChange={handleFileChange}
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleQuillChange} // Gọi hàm handleQuillChange
        modules={modules}
        formats={formats}
        className="custom-quill"
      />
      <Button onClick={handleSave}>Save</Button>
    </Container>
  );
};

export default BlogManager;
