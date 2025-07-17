import React, { useEffect, useState } from "react";
import Matter from "../../matter/matter";
import Style from "./index.module.scss";
import { Composite, Body } from "matter-js";
interface Icon {
  name: string;
  link?: string;
}
const icons: Icon[] = [
  { name: "github", link: "https://github.com/" },
  { name: "weibo", link: "" },
];
export default function Author() {
  let matter: Matter;
  const createIcon = () => {
    icons.forEach((icon) => {
      const physicsEl = matter.createEl(`icon-${icon.name}`);
      if (!physicsEl) {
        return;
      }
      Body.setVelocity(physicsEl, { x: 0, y: Math.random() * 10 });
    });
  };
  const fall = () => {
    const bodies = Composite.allBodies(matter.world);
    bodies.forEach((body) => {
      const _domEl = body._domEl;
      if (!_domEl) {
        return;
      }
      const height = _domEl.getBoundingClientRect().height;
      _domEl.style.top = body.position.y - height / 2 + "px";
    });
  };
  useEffect(() => {
    matter = new Matter();
    matter.update();
    createIcon();
    matter.addCallback(fall);
  }, []);
  return (
    <div className={Style.author}>
      <ul>
        {icons.map((icon, index) => {
          return (
            <li
              key={icon.name}
              id={`icon-${icon.name}`}
              className={Style.icon}
              style={{ left: `${25 + index * 25}%` }}
            ></li>
          );
        })}
      </ul>
    </div>
  );
}
