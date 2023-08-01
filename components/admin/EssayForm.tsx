import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";

const EssayForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const router = useRouter();

  const openFileBrowser = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const essayFormData = new FormData();

    const formData = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
    };

    essayFormData.append("data", JSON.stringify(formData));
    essayFormData.append(
      "essay",
      fileInputRef.current?.files ? fileInputRef.current.files[0] : ""
    );

    fetch(`${process.env.BACKEND_URL}/essays`, {
      method: "post",
      body: essayFormData,
    })
      .then((response) =>
        response.json().then((data) => {
          if (data.error) setError(data.error);
          // else router.push('/login');
        })
      )
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={(event) => submitHandler(event)}>
      <input type="text" ref={titleRef} placeholder="Title" />
      <textarea
        ref={descriptionRef}
        cols={30}
        rows={10}
        placeholder="Description (max. 170 characters)"
      ></textarea>
      {/* <button onClick={openFileBrowser}>Select a file</button> */}
      <input
        // style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
        name="essay"
        id="essay"
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default EssayForm;
