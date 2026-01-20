# Medi_Juice_examples

This project is a prototyping environment for experimenting with Phaser 3 visual effects, UI interactions, and "Juice" (visual feedback and polish).

## Project Status

This project is in active development.

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Running the Project
Start the development server:
```bash
npm run dev
```
Open the local URL provided by Vite (usually `http://localhost:5173`) in your browser.

---

## 📂 Project Structure

```
.
├── src/
│   ├── scenes/
│   │   ├── MenuScene.js        # Main menu listing all effects
│   │   ├── effects_scenes/     # Standalone scenes for testing effects
│   │   └── juice_snippets/     # Small, reusable effect snippets
│   └── ...
├── assets/                     # Images and static assets
├── phaser3-juice-plugin/       # Git submodule for juicy effects
└── package.json
```

---

## ✨ Juice Snippets

The most important part of this repository is the collection of "juice" snippets located in `src/scenes/juice_snippets`. These snippets are designed to be small, reusable, and easily adaptable for creating satisfying visual effects in your own projects.

Each snippet is a self-contained example of a specific effect, which you can browse and test from the main menu.

## 🛠️ How It Works

The project is built for rapid prototyping. The `MenuScene.js` file automatically detects and creates buttons for any scene found in the `effects_scenes` and `juice_snippets` directories.

We use **[Tweakpane](https://tweakpane.github.io/docs/)** to create easy-to-use UI controls for tweaking values in real-time without reloading the page.

---

## 📦 Key Libraries

*   **[Phaser 3](https://phaser.io/)**: The core game engine.
*   **[Tweakpane](https://tweakpane.github.io/docs/)**: UI for parameter tweaking.
*   **[Vite](https://vitejs.dev/)**: Fast development build tool.
*   **[phaser3-juice-plugin](https://github.com/RetroVX/phaser3-juice-plugin)**: A plugin for creating juicy effects.
