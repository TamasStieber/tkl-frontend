import AdminWrapper from "@/components/admin/AdminWrapper";
import Post from "@/components/Post";
import usePosts from "@/hooks/usePosts";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function Posts() {
  const [value, setValue] = useState("");
  const { createPost } = usePosts();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const post = {
      url: value,
    };

    createPost(post);
  };

  return (
    <AdminWrapper title="Manage Posts">
      <form onSubmit={(event) => submitHandler(event)}>
        <input type="text" onChange={(event) => handleChange(event)} />
        <button type="submit">Post</button>
      </form>
      {/* <Post /> */}
    </AdminWrapper>
  );
}
