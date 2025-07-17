import React, { useState } from "react";
import { config, Config } from "./config";
import Style from "../../assets/style/index.module.scss";

export default function Index() {
  const [cards, setCards] = useState(config);
  const [active, setActive] = useState(0);
  const [content, setContent] = useState(config[active].jsx);
  const move = (direction: string) => {
    const newActive =
      direction === "left"
        ? active === 0
          ? 0
          : active - 1
        : active === cards.length - 1
        ? cards.length - 1
        : active + 1;
    setActive(newActive);
    setContent(
      config[newActive].jsx || (
        <div className={Style.content}>{config[newActive].name}</div>
      )
    );
  };

  const dymicStyle = (index: number) => {
    const gap = Math.abs(active - index);
    if (index === active) {
      return { left: 0 };
    } else if (index < active) {
      return { left: `-${gap * 100}%` };
    } else {
      return { left: `${gap * 100}%` };
    }
  };

  return (
    <>
      <div className={Style.container}>{content}</div>
      <div className={Style.btns}>
        <div className={Style.btn} onClick={() => move("left")}>
          上一页
        </div>
        <div className={Style.btn} onClick={() => move("right")}>
          下一页
        </div>
      </div>
    </>
  );
}
