import React from "react";
import Author from "../../components/author/author";

export interface Config {
  name: string;
  id: number;
  jsx?: any;
}

export const config: Config[] = [
  { name: "联系", id: 2, jsx: <Author /> },
  { name: "首页", id: 1 },
  { name: "文章", id: 5 },
];
