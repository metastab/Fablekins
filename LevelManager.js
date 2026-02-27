// LevelManager.js
// Tracks player level. Level increases every 5 dots eaten.
// Each level increases ghost speed by a fixed multiplier.

class LevelManager {
    constructor(config = {}) {
        this.dotsPerLevel = config.dotsPerLevel ?? 5;
        this.baseGhostSpeed = config.baseGhostSpeed ?? 75;  // px/s at level 1
        this.speedIncrement = config.speedIncrement ?? 15;  // px/s added per level

        this.level = 1;
        this.dotsThisLevel = 0;         // dots eaten since last level-up
        this.totalDots = 0;           // lifetime dot count

        // Flash feedback when levelling up
        this._flashTimer = 0;
        this._flashDuration = 1.2;      // seconds to show "LEVEL UP!" banner
    }

    // ── Called by OverworldMap every time a dot is eaten ──────────────────────
    onDotEaten(map) {
        this.dotsThisLevel++;
        this.totalDots++;

        if (this.dotsThisLevel >= this.dotsPerLevel) {
            this._levelUp(map);
        }
    }

    // ── Internal level-up handler ─────────────────────────────────────────────
    _levelUp(map) {
        this.level++;
        this.dotsThisLevel = 0;
        this._flashTimer = this._flashDuration;

        console.log(`Level up! Now level ${this.level}. Ghost speed → ${this.ghostSpeed()} px/s`);

        // Apply new speed to the ghost immediately
        if (map && map.gameObjects && map.gameObjects.ghost) {
            map.gameObjects.ghost.speed = this.ghostSpeed();
        }
    }

    // ── Current ghost speed for this level ───────────────────────────────────
    ghostSpeed() {
        return this.baseGhostSpeed + (this.level - 1) * this.speedIncrement;
    }

    // ── Call once per frame from Overworld.drawHUD() ──────────────────────────
    drawLevelIndicator(ctx, deltaTime) {
        // Tick down the flash
        if (this._flashTimer > 0) {
            this._flashTimer = Math.max(0, this._flashTimer - deltaTime);
        }

        ctx.save();

        // ── Level badge (top-left) ───────────────────────────────────────────
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.fillRect(4, 4, 72, 18);

        ctx.fillStyle = "#FFD700";          // gold text
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(`LVL ${this.level}`, 8, 7);

        // ── Progress pips ────────────────────────────────────────────────────
        const pipW = 8;
        const pipH = 4;
        const pipGap = 3;
        const startX = 8;
        const startY = 17;

        for (let i = 0; i < this.dotsPerLevel; i++) {
            const filled = i < this.dotsThisLevel;
            ctx.fillStyle = filled ? "#FF4444" : "rgba(255,255,255,0.25)";
            ctx.fillRect(startX + i * (pipW + pipGap), startY, pipW, pipH);
        }

        // ── "LEVEL UP!" flash banner ─────────────────────────────────────────
        if (this._flashTimer > 0) {
            const alpha = Math.min(1, this._flashTimer / 0.3);   // fade in fast
            ctx.globalAlpha = alpha * Math.min(1, this._flashTimer / this._flashDuration * 3);

            ctx.fillStyle = "rgba(0,0,0,0.55)";
            ctx.fillRect(0, 80, ctx.canvas.width, 26);

            ctx.fillStyle = "#FFD700";
            ctx.font = "bold 14px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`⬆ LEVEL ${this.level}!`, ctx.canvas.width / 2, 93);

            ctx.globalAlpha = 1;
        }

        ctx.restore();
    }
}
