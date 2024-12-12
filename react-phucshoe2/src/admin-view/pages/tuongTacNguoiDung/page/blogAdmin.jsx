import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image"; // Import extension Image
import { useDropzone } from "react-dropzone"; // Dùng thư viện react-dropzone
import axios from "axios";
import { Button, Container, Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
const BlogManager = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null); // Để lưu trữ ID của bài viết khi chỉnh sửa
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  // Khởi tạo editor với extension Image
  const editor = useEditor({
    extensions: [StarterKit, Image], // Thêm Image extension
    content: content, // Nội dung ban đầu (khi sửa hoặc tạo mới)
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Cập nhật nội dung mỗi khi có sự thay đổi
    },
  });

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
          content,
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
      .delete(`/api/posts/${id}`)
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
      .get(`/api/posts/${id}`)
      .then((response) => {
        setEditId(id);
        setContent(response.data.content);
        editor.commands.setContent(response.data.content); // Cập nhật nội dung cho editor
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to load content");
      });
  };

  // Hàm tải danh sách bài viết
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to load posts");
      });
  }, []);

  // Xử lý kéo và thả hình ảnh vào editor
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      editor.commands.setImage({ src: imageUrl });
    };
    reader.readAsDataURL(file);
  };
  const handleInsertImage = (url) => {
    if (url) {
      editor.commands.setImage({ src: url });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <Container>
      <h2>Blog Editor</h2>

      <Box
        component="div"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <EditorContent editor={editor} />
      </Box>

      <Button variant="contained" color="primary" onClick={handleSave}>
        {editId ? "Update Post" : "Create Post"}
      </Button>

      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => handleInsertImage(e.target.value)}
      />

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag and drop an image here, or click to select one</p>
      </div>

      <div>
        <h3>Posts</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <Button variant="outlined" onClick={() => handleEdit(post.id)}>
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default BlogManager;
