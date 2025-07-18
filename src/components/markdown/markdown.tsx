import React, { useEffect } from "react";
import MarkdownLoader from "react-markdown";

export default function Markdown() {
  const [text, setText] = React.useState("");
  const [files, setFiles] = React.useState<string[]>([]);
  const init = async () => {
    const files = await fetch("../../database/md/fileNames.txt");
    if (!files) {
      return;
    }
    const fileNames = await files.text();
    setFiles(fileNames.split("\n"));
  };
  const read = async (url: string = "test.md") => {
    try {
      const res = await fetch("../../database/md/" + url);
      const text = await res.text();
      setText(text);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return <MarkdownLoader>{text}</MarkdownLoader>;
}
