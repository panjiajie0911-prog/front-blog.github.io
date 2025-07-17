import { Engine, World, Bodies, Body } from "matter-js";
export default class Matter {
  engine: Engine;
  world: World;
  bodyElementMap: Map<any, any>;
  callbacks: Function[] = [];
  constructor() {
    this.init();
  }
  init() {
    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 1; // 设置重力

    // 创建刚体地面
    const ground = Bodies.rectangle(
      window.innerWidth / 2, // x轴
      window.innerHeight, // y轴
      window.innerWidth, // 宽度
      6, // 高度
      { isStatic: true, friction: 1, restitution: 0.2 } // 不移动
    );

    World.add(world, ground);
    Engine.run(engine); // 启动物理更新循环

    // 映射关系
    this.bodyElementMap = new Map();
    this.engine = engine;
    this.world = world;
  }
  update() {
    Engine.update(this.engine);
    this.callbacks.forEach((cb) => {
      cb();
    });
    requestAnimationFrame(this.update.bind(this));
  }
  createEl(id: string) {
    const domEL = document.getElementById(id);
    if (!domEL) {
      return;
    }
    const { width, height, left, top } = domEL.getBoundingClientRect();
    const physicsEl = Bodies.rectangle(left, top, width, height, {
      isStatic: false,
      friction: 0.1, // 摩擦力
      restitution: 0.85, // 弹性
    });
    physicsEl.name = id;
    physicsEl._domEl = domEL; // 将dom元素保存在刚体上

    World.add(this.world, physicsEl);
    // 保存刚体和dom元素的映射关系
    this.bodyElementMap.set(physicsEl, domEL);

    return physicsEl;
  }
  createWall(direction: string = "left") {
    const wall = Bodies.rectangle(
      direction === "left" ? 0 : window.innerWidth,
      direction === "top" ? 0 : window.innerHeight,
      direction === "left" || direction === "right" ? 6 : window.innerWidth,
      direction === "left" || direction === "right" ? window.innerHeight : 6,
      { isStatic: true, friction: 1, restitution: 0.2 }
    );
    World.add(this.world, wall);
  }
  addCallback(cb: Function) {
    this.callbacks.push(cb);
  }
}
