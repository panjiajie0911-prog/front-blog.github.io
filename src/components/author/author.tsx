import React, { useEffect } from "react";
import Matter from "../../matter/matter";
import Style from "./index.module.scss";
import { Composite, Body } from "matter-js";

interface Icon {
  name: string;
  svg: string;
  id?: number;
}
const icons: Icon[] = [
  { name: "phone", svg: "phone" },
  { name: "gitlab", svg: "gitlab" },
  { name: "gmail", svg: "gmail" },
  { name: "tencent", svg: "tencent" },
];
export default function Author() {
  let matter: Matter;
  const createIcon = () => {
    icons.forEach((icon, index) => {
      const physicsEl = matter.createEl(`icon-${icon.name}`);
      if (!physicsEl) {
        return;
      }
      Body.setVelocity(physicsEl, { x: 0, y: Math.random() * 10 });
      physicsEl.position.y = index === 0 ? 0 : -10 * index;
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
      _domEl.style.left =
        body.position.x - _domEl.getBoundingClientRect().width / 2 + "px";
    });
  };
  const show = (icon: Icon) => {
    const bodies = Composite.allBodies(matter.world);
    const target = bodies.find((body) => body.name === `icon-${icon.name}`);
    if (!target) {
      return;
    }
    const _domEl = target._domEl;
    if (!_domEl) {
      return;
    }
    Body.applyForce(target, target.position, {
      x: Math.random() * (Math.random() > 0.5 ? 1 : -1),
      y: -1,
    }); // 向上弹跳
  };
  useEffect(() => {
    matter = new Matter();
    matter.createWall("left");
    matter.createWall("right"); // 创建左右空气墙
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
              className={`${Style.icon} ${Style[icon.svg]}`}
              style={{ left: `${50 + 1 * index}%` }}
              onClick={() => {
                show(icon);
              }}
            ></li>
          );
        })}
      </ul>
    </div>
  );
}
