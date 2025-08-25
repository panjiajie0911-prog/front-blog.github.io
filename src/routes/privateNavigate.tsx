/*
 * @Author: 潘家杰 panjiajie@chexiao.co
 * @Date: 2025-08-15 11:03:24
 * @LastEditors: 潘家杰 panjiajie@chexiao.co
 * @LastEditTime: 2025-08-15 14:07:59
 * @FilePath: \blog-front\src\routes\privateNavigate.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateNavigate(props: {
  component: React.ComponentType;
  path: string;
  [key: string]: any;
}) {
  const menu = useSelector((state: any) => state.menu.menu);
  const navigate = useNavigate();
  const match = (path: string, menu: any[]) => {
    let isMatch = false;
    for (let i = 0; i < menu.length; i++) {
      const { children } = menu[i];
      if (menu[i].path === path) {
        return true;
      }
      if (Array.isArray(children)) {
        isMatch = match(path, children);
        if (isMatch) {
          return true;
        }
      }
    }
    return false;
  };
  const jump = () => {
    if (!match(props.path, menu)) {
      // navigate("/404");
      alert("没有匹配的页面，即将调回404页面");
      return;
    }
    alert("匹配成功，即将跳转到指定页面");
    navigate(props.path);
  };

  return cloneElement(props.children, { navigate, onClick: jump });
}
