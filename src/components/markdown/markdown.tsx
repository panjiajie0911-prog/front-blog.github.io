/*
 * @Author: 潘家杰 panjiajie@chexiao.co
 * @Date: 2025-07-18 15:10:50
 * @LastEditors: 潘家杰 panjiajie@chexiao.co
 * @LastEditTime: 2025-08-25 17:22:38
 * @FilePath: \blog-front\src\components\markdown\markdown.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useMemo, useState } from "react";
import MarkdownLoader from "react-markdown";
import Style from "./index.module.scss";
export default function Markdown() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
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
  const list = useMemo(
    () => files.filter((file: string) => file.indexOf(keyword) !== -1),
    [keyword, files]
  );
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <input
        className={Style.input}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <ul className={Style.ul} onClick={() => setVisible(false)}>
        {list.map((file) => {
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
