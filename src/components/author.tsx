import React, { useEffect, useRef } from "react";
import { init } from "../pixi/pixi";
export default function Author() {
  const container = useRef();
  const start = () => {
    const view = init();
    container.current.appendChild(view);
  };
  useEffect(() => {
    start();
  }, []);
  return <div ref={container}></div>;
}
