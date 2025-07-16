import React, { useState, useEffect } from "react";
import { config, Config } from "./config";
import Style from "../../assets/style/index.module.scss";

export default function Index() {
  const [cards, setCards] = useState([]);
  const [active, setActive] = useState(0);
  const move = (direction: string) =>
    direction === "left"
      ? setActive(active === 0 ? 0 : active - 1)
      : setActive(active === cards.length - 1 ? cards.length - 1 : active + 1);
  const fetch = () => {
    setCards(config);
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
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <ul className={Style.container}>
        {cards.map((item, index) => (
          <li key={item.id} style={dymicStyle(index)}>
            {item.name}
          </li>
        ))}
      </ul>
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
