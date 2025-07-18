import React from "react";
import MarkdownLoader from "react-markdown";

export default function Markdown() {
  const [text, setText] = React.useState("");
  const init = async () => {
    try {
      const res = await fetch("../../database/md/test.md");
      const text = await res.text();
      setText(text);
    } catch (error) {
      console.error(error);
    }
  };
  init();

  return <MarkdownLoader>{text}</MarkdownLoader>;
}
