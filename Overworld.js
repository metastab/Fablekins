class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null; // Initialization pe define karenge isko
  }


  drawHUD(deltaTime) {
    // Draw level indicator (top-left badge + level-up flash)
    this.map.levelManager.drawLevelIndicator(this.ctx, deltaTime);
  }


  //Defining the game Loop

  startGameLoop() {
    let lastTime = performance.now();

    const step = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000; // seconds
      lastTime = currentTime;

      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const CameraPerson = this.map.gameObjects.hero;

      // Draw lower map
      this.map.drawLowerImg(this.ctx, CameraPerson);

      // Update game objects (time-aware)
      Object.values(this.map.gameObjects).forEach(obj => {
        obj.update({
          pressedKey: this.DirectionInput.direction,
          map: this.map,
          deltaTime,
        });
      });

      // Draw sprites
      Object.values(this.map.gameObjects).forEach(obj => {
        if (obj.sprite) {
          obj.sprite.draw(this.ctx, CameraPerson);
        }
        if (obj.draw) {
          obj.draw(this.ctx, CameraPerson);
        }

      });

      this.map.activateGhostOnce();

      // Draw upper map
      this.map.drawUpperImg(this.ctx, CameraPerson);

      this.drawHUD(deltaTime);


      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }


  //Starting the init ()

  init() {

    this.map = new OverworldMap(window.OverworldMaps.NorthStreet);
    //console.log(this.map.walls);

    // Removing the touch controls for pc players
    //console.log(window.matchMedia("(any-hover: hover)").matches);
    //console.log(window.matchMedia("(any-pointer: fine)").matches);

    if (window.matchMedia("(any-pointer: fine)").matches) {
      document.querySelector(".touch-controls").style.display = "none";
    }

    this.DirectionInput = new DirectionInput();
    this.DirectionInput.init();
    this.startGameLoop();

    this.map.spawnDot();



    //---------------------------[OLD CODE -> HARDCODED]--------------------------------------//

    //-----------------------------------------------Background Image 

    // const image = new Image();
    // image.onload = () => {
    //   this.ctx.drawImage(image,0,0)
    // };
    // image.src = "/images/maps/DemoLower.png";

    //-----------------------------------------------Place some game objects

    // const hero = new GameObject({
    // x:5,
    // y:6,
    // useShadow:true,
    // })

    // const npc1 = new GameObject({
    // x:7,
    // y:8,
    // src:"/images/characters/people/npc1.png",
    // })

    //-----------------------------------------------Drawing these Game Objects

  }
}
