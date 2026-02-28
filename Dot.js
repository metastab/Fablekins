class Dot extends GameObject {
  constructor(config) {
    super({ ...config }); // no Sprite

    this.collected = false;
    this.radius = 4; // dot size
  }

  update(state) {
    const hero = state.map.gameObjects.hero;

    if (hero.x === this.x && hero.y === this.y && !this.collected) {
      this.collected = true;
      state.map.removeDot(this);
      console.log("Kha Liya!!! ");
    }
  }

  draw(ctx, CameraPerson) {
    const drawX =
      this.x + Utilities.withGrid(10.5) - CameraPerson.x + 8;
    const drawY =
      this.y + Utilities.withGrid(6) - CameraPerson.y + 8;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(drawX, drawY, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PowerDot  –  Golden dot (#FFD700)
//   On pickup: hero speed +5 | ghost speed -5
// ─────────────────────────────────────────────────────────────────────────────
class PowerDot extends GameObject {
  constructor(config) {
    super({ ...config });

    this.collected = false;
    this.radius = 7;          // slightly larger than a normal dot
    this._pulse = 0;          // animation timer (seconds)
  }

  update(state) {
    const hero = state.map.gameObjects.hero;
    this._pulse += state.deltaTime ?? 0.016;

    if (hero.x === this.x && hero.y === this.y && !this.collected) {
      this.collected = true;

      // ── Hero speed boost ──────────────────────────────────────────────────
      hero.speed = (hero.speed ?? 144) + 5;
      hero.baseSpeed = hero.speed;          // keep animation ratio in sync

      // ── Ghost speed reduction ─────────────────────────────────────────────
      const ghost = state.map.gameObjects.ghost;
      if (ghost) {
        ghost.speed = Math.max(10, (ghost.speed ?? 75) - 5);
      }

      state.map.removePowerDot(this);
      console.log(`Power-Up! Hero speed - ${hero.speed} | Ghost speed - ${ghost?.speed}`);
    }
  }

  draw(ctx, CameraPerson) {
    const drawX = this.x + Utilities.withGrid(10.5) - CameraPerson.x + 8;
    const drawY = this.y + Utilities.withGrid(6) - CameraPerson.y + 8;

    // Pulsing glow radius
    const pulse = Math.sin(this._pulse * 4) * 2;
    const r = this.radius + pulse;

    ctx.save();

    // Outer glow
    const grd = ctx.createRadialGradient(drawX, drawY, r * 0.2, drawX, drawY, r * 2.2);
    grd.addColorStop(0, "rgba(255, 215, 0, 0.55)");
    grd.addColorStop(1, "rgba(255, 215, 0, 0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(drawX, drawY, r * 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Core dot
    ctx.fillStyle = "#FFD700";
    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(drawX, drawY, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
