"use client";

import dynamic from 'next/dynamic';
// import React, {useState} from 'react';
const ReactQuill = dynamic(()=> import("react-quill"), {ssr: false});
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
//   const defaultContent = `
//   <h3>Item Detail</h3>
//   <p>Materials: ...</h3>
//   <h6>About Product</h6>
// `;
// const [content, setContent] = useState(defaultContent);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      className="bg-white"
    />
  );
}