import React, { useState, useEffect } from "react";

const TextEditor = ({ initialText, onTextChange }: any) => {
  const [text, setText] = useState(initialText || "");

  useEffect(() => {
    setText(initialText || "");
  }, [initialText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  return (
    <textarea
      className="w-full h-full p-4 mt-2 border"
      style={{ height: "100%", marginTop: 10 }}
      value={text}
      onChange={handleChange}
      placeholder="Escreva seu texto aqui..."
    />
  );
};

export default TextEditor;
