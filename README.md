![Fablekins Logo](./images/fablekins_logo.png)

![version](https://img.shields.io/badge/version-beta_0.8-blue)

A lightweight 2D tile-based game engine built entirely in vanilla JavaScript using HTML5 Canvas.

---
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Canvas](https://img.shields.io/badge/HTML5-Canvas-orange)
![Css](https://img.shields.io/badge/CSS-vanilla-lightblue)
![Status](https://img.shields.io/badge/status-active-brightgreen)

---

## *Live Demo*
🔗 https://fablekins.vercel.app

---

## ✨ Features
- Tile-based grid movement (16px system)
- Sprite animation system
- Layered rendering (background → entities → foreground)
- Collision system
- Level scaling (ghost speed increases per level)
- Modular architecture

---

## 🏗 Architecture Overview
The engine follows a layered structure:

init → Overworld → Map → GameObjects → Sprite.draw()

Core components:
- **GameObject** – Base entity abstraction
- **Person** – Movement + input control
- **Sprite** – Rendering abstraction
- **OverworldMap** – Map layers and object placement
- **DirectionInput** – Input handling system
- **LevelManager** - Level management and level up system

---

## 🎨 Rendering Order
1. Background layer
2. Dynamic entities
3. Foreground overlay

---

## 🧠 Technical Highlights
- Frame-rate normalized movement system
- Sprite sheet animation controller
- Modular file responsibility separation
- Scalable difficulty logic
- Real-time canvas rendering loop

---

## 📦 Tech Stack
- JavaScript (Vanilla)
- HTML5 Canvas
- CSS

---

## 🌱 Why This Project?
This project was built to understand the fundamentals of game engine architecture, rendering pipelines, and real-time systems without relying on external frameworks.
