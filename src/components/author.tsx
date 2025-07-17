import React, { useEffect, useRef } from "react";

export default function Author() {
  const container = useRef();

  useEffect(() => {}, []);
  return <div ref={container}></div>;
}
