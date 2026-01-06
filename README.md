# Medi_Juice_examples

Welcome to **Phaser Lab**! This project is a prototyping environment used to experiment with Phaser 3 effects, UI interactions, and "Juice" (visual feedback/polish). It is currently being used to develop components for the "Med | UX Improvements" client project.

## Project Status

This project is in active development.

## Project Outline

This project is structured to allow for rapid prototyping of new effects. The main entry point is `src/main.js`, which loads the `MenuScene`. The `MenuScene` dynamically loads all effects from the `src/scenes/effects/` directory.

Key technologies used:
*   **[Phaser 3](https://phaser.io/)**: The core game engine.
*   **[Tweakpane](https://tweakpane.github.io/docs/)**: UI for parameter tweaking.
*   **[Vite](https://vitejs.dev/)**: Fast development build tool.

## Usage

### 1. Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### 2. Installation
Navigate to the `phaser-lab` directory and install dependencies:
```bash
cd phaser-lab
npm install
```

### 3. Running the Project
Start the development server:
```bash
npm run dev
```
Open the local URL (usually `http://localhost:5173`) in your browser. You should see the **Effect Lab** menu.
