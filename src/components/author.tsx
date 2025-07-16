import React, { useEffect, useRef } from "react";
import { init } from "../pixi/pixi";
export default function Author() {
  const container = useRef();
  const start = () => {
    const app = init();
    container.current.appendChild(app.view);
  };
  useEffect(() => {
    start();
  }, []);
  return <div ref={container}></div>;
}
