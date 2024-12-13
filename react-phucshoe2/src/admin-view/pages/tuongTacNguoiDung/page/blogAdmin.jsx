import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image"; // Import extension Image
import { useDropzone } from "react-dropzone"; // Dùng thư viện react-dropzone
import axios from "axios";
import { Button, Container, Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
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
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null); // Để lưu trữ ID của bài viết khi chỉnh sửa
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  // Hàm xử lý lưu bài viết mới
  const handleSave = () => {
    if (editId) {
      // Cập nhật bài viết khi có editId
      axios
        .put(`${api}/bai-viet/${editId}`, { content })
        .then((response) => {
          console.log("Updated Content:", response.data);
          alert("Content Updated");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to update content");
        });
    } else {
      // Tạo mới bài viết
      axios
        .post(`${api}/bai-viet`, {
          NOI_DUNG_BAIVIET: content,
          TIEU_DE: title,
          ID_NGUOI_DUNG: userInfo.ID_NGUOI_DUNG,
        })
        .then((response) => {
          console.log("Created Content:", response.data);
          alert("Content Created");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to create content");
        });
    }
  };

  // Hàm xử lý xóa bài viết
  const handleDelete = (id) => {
    axios
      .delete(`/bai-viet/${id}`)
      .then((response) => {
        console.log("Deleted Content:", response.data);
        alert("Content Deleted");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete content");
      });
  };

  // Hàm tải bài viết để chỉnh sửa
  const handleEdit = (id) => {
    axios
      .get(`/bai-viet/${id}`)
      .then((response) => {
        setEditId(id);
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to load content");
      });
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
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
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
