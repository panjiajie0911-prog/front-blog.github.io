import React from "react";
import Author from "../../components/author";
export interface Config {
  name: string;
  id: number;
  jsx?: React.ReactNode;
}

export const config: Config[] = [
  { name: "首页", id: 1 },
  { name: "联系", id: 2, jsx: <Author /> },
  { name: "文章", id: 5 },
];
