import React, { useEffect, useState } from "react";
import MarkdownLoader from "react-markdown";
import Style from "./index.module.scss";
export default function Markdown() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const init = async () => {
    const files = await fetch("../../database/md/fileNames.txt");
    if (!files) {
      return;
    }
    const fileNames = await files.text();
    setFiles(fileNames.split("\n"));
  };
  const read = async (url: string) => {
    try {
      const res = await fetch("../../database/md/" + url);
      const text = await res.text();
      setText(text);
      setVisible(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <ul className={Style.ul} onClick={() => setVisible(false)}>
        {files.map((file) => {
          return (
            <li key={file} onClick={() => read(file)}>
              {file}
            </li>
          );
        })}
      </ul>
      <div
        className={Style.modal}
        style={{ display: visible ? "block" : "none" }}
        onClick={() => setVisible(false)}
      >
        <MarkdownLoader>{text}</MarkdownLoader>
      </div>
    </>
  );
}
