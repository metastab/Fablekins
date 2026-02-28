class InstructionsScreen {
    constructor({ canvas, ctx, onProceed }) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.onProceed = onProceed;
        this.btn = { x: 131, y: 155, w: 90, h: 22 };
        this._click = this._click.bind(this);
        canvas.addEventListener("click", this._click);
    }

    draw() {
        const { ctx: c, canvas: cv } = this;
        const W = cv.width, H = cv.height;

        // Background
        c.fillStyle = "#0d0d1a";
        c.fillRect(0, 0, W, H);

        // Border
        c.strokeStyle = "#9cdb44";
        c.lineWidth = 3;
        c.strokeRect(6, 6, W - 12, H - 12);

        // Title
        c.fillStyle = "#ede7f6";
        c.font = "bold 13px 'Courier New'";
        c.textAlign = "center";
        c.fillText("HOW TO PLAY", W / 2, 32);

        // Instructions
        const lines = [
            "👻  Avoid the ghost",
            "🔴  Collect dots to level up",
            "⚡  Golden dot = speed boost",
            "↑↓←→  Move with arrow keys",
        ];
        c.font = "10px 'Courier New'";
        c.fillStyle = "#b39ddb";
        lines.forEach((txt, i) => c.fillText(txt, W / 2, 65 + i * 22));

        // Proceed button
        const { x, y, w, h } = this.btn;
        c.fillStyle = "#4a148c";
        c.fillRect(x, y, w, h);
        c.strokeStyle = "#d8d893ff";
        c.lineWidth = 1.5;
        c.strokeRect(x, y, w, h);
        c.fillStyle = "#ede7f6";
        c.font = "bold 11px 'Courier New'";
        c.fillText("▶ PROCEED", W / 2, y + 15);
    }

    _click(e) {
        const r = this.canvas.getBoundingClientRect();
        const mx = (e.clientX - r.left) * (this.canvas.width / r.width);
        const my = (e.clientY - r.top) * (this.canvas.height / r.height);
        const { x, y, w, h } = this.btn;
        if (mx >= x && mx <= x + w && my >= y && my <= y + h) {
            this.canvas.removeEventListener("click", this._click);
            this.onProceed();
        }
    }
}
