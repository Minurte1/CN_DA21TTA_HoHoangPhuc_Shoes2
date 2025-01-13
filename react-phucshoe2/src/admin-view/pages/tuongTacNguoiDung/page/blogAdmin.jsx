import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { enqueueSnackbar } from "notistack";
import { getThemeConfig } from "../../../../services/themeService";
import { Add, Edit, Delete } from "@mui/icons-material";
import translations from "../../../../redux/data/translations";

const BlogManager = () => {
  const currentTheme = getThemeConfig(localStorage.getItem("THEMES") || "dark");
  const api = process.env.REACT_APP_URL_SERVER;
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null); // Để lưu trữ ID của bài viết khi chỉnh sửa

  const [images, setImages] = useState(null);
  const [descriptionTitle, setDecripttionTitle] = useState("");
  const [listBlog, setListBlog] = useState([]);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  useEffect(() => {
    fetchBlog();
  }, []);
  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_SERVER}/bai-viet`
      );
      if (response.data.EC === 1) {
        setListBlog(response.data.DT);
      }
    } catch (err) {
    } finally {
    }
  };
  const handleSave = async () => {
    const formData = new FormData();

    try {
      if (editId) {
        // Truyền dữ liệu cập nhật vào formData
        formData.append("content", content);
        // Truyền dữ liệu tạo mới vào formData
        formData.append("NOI_DUNG_BAIVIET", content);
        formData.append("TIEU_DE", title);
        formData.append("ID_NGUOI_DUNG", userInfo.ID_NGUOI_DUNG);
        formData.append("HINH_ANH_BAIVIET", images); // Hình ảnh
        formData.append("NOI_DUNG_TIEU_DE", descriptionTitle);
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
          fetchBlog();
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
  // Hàm mở dialog và hiển thị thông tin người dùng
  const handleEditClick = (blog) => {
    setOpen(true);
    setTitle(blog.TIEU_DE);
    setDecripttionTitle(blog.NOI_DUNG_TIEU_DE);
    setEditId(blog.ID_BAI_VIET);
  };

  // Hàm xử lý xóa bài viết
  const handleDelete = async (blog) => {
    try {
      // Gửi yêu cầu xóa bài viết
      const response = await axios.delete(
        `${api}/bai-viet/${blog.ID_BAI_VIET}`
      );
      if (response.data.EC === 1) {
        fetchBlog();
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
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImages(e.target.files[0]);
    }
  };
  const handleQuillChange = (value) => {
    setContent(value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  // Đóng modal
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container
      sx={{
        backgroundColor: currentTheme.backgroundColor,
        height: listBlog.length <= 5 ? "100vh" : "auto",
      }}
    >
      {" "}
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          {t.managePosts}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleClickOpen}
          sx={{
            marginBottom: 2,
            backgroundColor: currentTheme.color,
            color: currentTheme.backgroundColor,
          }}
        >
          {t.createPost}
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
          borderRadius: "8px",
          boxShadow: "none",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: currentTheme.color }}>
                {t.title}
              </TableCell>
              <TableCell
                sx={{
                  color: currentTheme.color,
                }}
              >
                {t.postContentTitle}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {t.createdDate}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {t.status}
              </TableCell>{" "}
              <TableCell sx={{ color: currentTheme.color }}>
                {t.image}
              </TableCell>
              <TableCell sx={{ color: currentTheme.color }}>
                {t.actions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listBlog.map((blog) => (
              <TableRow key={blog.ID_BAI_VIET}>
                <TableCell sx={{ color: currentTheme.color }}>
                  {blog.TIEU_DE}
                </TableCell>
                <TableCell
                  sx={{
                    color: currentTheme.color,
                  }}
                >
                  {blog.NOI_DUNG_TIEU_DE}
                </TableCell>
                <TableCell sx={{ color: currentTheme.color }}>
                  {new Date(blog.NGAY_CAP_NHAT_BAIVIET).toLocaleDateString(
                    "vi-VN"
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      blog.TRANG_THAI_BAIVIET === t.activeStatus
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {blog.TRANG_THAI_BAIVIET}
                </TableCell>
                <TableCell>
                  <img
                    style={{ width: "60px" }}
                    src={
                      blog.HINH_ANH_BAIVIET
                        ? `${api}/images/${blog.HINH_ANH_BAIVIET}`
                        : ""
                    }
                    alt={blog.HINH_ANH_BAIVIET || "User"}
                  ></img>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(blog)}
                  >
                    {t.edit}
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDelete(blog)}
                  >
                    {t.delete}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Blog Editor</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label={t.postTitle}
            name="title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />

          <TextField
            multiline
            margin="dense"
            label={t.postContent}
            type="text"
            value={descriptionTitle}
            fullWidth
            name="NOI_DUNG_TIEU_DE"
            minRows={5}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setDecripttionTitle(e.target.value)}
          />

          <TextField
            margin="dense"
            label={t.postImage}
            type="file"
            fullWidth
            name="images"
            InputLabelProps={{ shrink: true }}
            onChange={handleFileChange}
          />

          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleQuillChange}
            modules={modules}
            formats={formats}
            className="custom-quill"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t.cancelButtonLabel}
          </Button>
          <Button onClick={handleSave} color="primary">
            {t.save}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogManager;
