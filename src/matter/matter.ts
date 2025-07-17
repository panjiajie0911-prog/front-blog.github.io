import { Engine, World, Bodies } from "matter-js";
export default class Matter {
  engine: Engine;
  world: World;
  constructor() {
    this.init();
  }
  init() {
    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 1; // 设置重力

    // 创建刚体地面
    const ground = Bodies.rectangle(
      0, // x轴
      window.innerHeight, // y轴
      window.innerWidth, // 宽度
      6, // 高度
      { isStatic: true } // 不移动
    );

    World.add(world, ground);

    this.engine = engine;
    this.world = world;
  }
  update() {
    Engine.update(this.engine);
    requestAnimationFrame(this.update.bind(this));
  }
}
