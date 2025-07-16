import { Application, Container } from "pixi.js";

const init = () => {
  const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const container = new Container();
  app.stage.addChild(container);
  return app;
};

export { init };
