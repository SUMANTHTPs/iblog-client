import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch("https://blog-api-fawn-nu.vercel.app/blogs/post/" + id).then(
      (response) => {
        response.json().then((postItem) => {
          setTitle(postItem.title);
          setContent(postItem.content);
          setSummary(postItem.summary);
        });
      }
    );
  }, [id]);

  const updatePost = async (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch(
      "https://blog-api-fawn-nu.vercel.app/blogs/post",
      {
        method: "PUT",
        body: data,
        credentials: "include",
      }
    );
    if (response.ok) {
      navigate(`/post/${id}`);
    }
  };
  return (
    <div>
      <form className="login-form create-form" onSubmit={updatePost}>
        <h2
          style={{ paddingBottom: "2.5em" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Update your post
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
        />
        <input
          type="text"
          placeholder="summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          type="file"
          placeholder="Select"
          accept=".jpg, .jpeg, .png"
          max={1048576}
          onChange={(ev) => setFiles(ev.target.files)}
        />
        <Editor value={content} onChange={setContent} />
        <button style={{ margin: "auto", width: "30%" }}>Update</button>
      </form>
    </div>
  );
};

export default EditPost;
