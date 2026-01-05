# Phaser Lab Onboarding Guide

Welcome to **Phaser Lab**! This project is a prototyping environment used to experiment with Phaser 3 effects, UI interactions, and "Juice" (visual feedback/polish). It is currently being used to develop components for the "Med | UX Improvements" client project.

## 🚀 Quick Start

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

---

## 📂 Project Structure

```
phaser-lab/
├── src/
│   ├── main.js                 # Entry point: Configures Game & loads scenes
│   ├── ui/
│   │   └── createPane.js       # Helper for creating Tweakpane controls
│   ├── scenes/
│   │   ├── MenuScene.js        # Main menu listing all effects
│   │   └── effects/            # 🧪 YOUR PLAYGROUND
│   │       ├── index.js        # Auto-loader for effect scenes
│   │       ├── DesignPanelScene.js
│   │       ├── ButtonPulse.js
│   │       └── ...
├── assets/                     # Images and static assets
├── phaser3-juice-plugin/       # Local plugin for juicy effects
├── package.json
└── vite.config.js
```

---

## 🛠️ How It Works

### Auto-Magic Effect Loading
The project is built to make adding new experiments extremely fast. You **do not** need to manually register scenes in `main.js` or `MenuScene.js`.

The file `src/scenes/effects/index.js` automatically detects any `.js` file in the `effects/` directory and exports it. `MenuScene` then dynamically generates buttons for each detected scene.

### UI Controls (Tweakpane)
We use [Tweakpane](https://tweakpane.github.io/docs/) to create easy debug UIs for tweaking values (speed, gravity, colors) in real-time without reloading.

---

## 🧪 How to Create a New Effect

1.  **Create a File**: Add a new file in `src/scenes/effects/`, e.g., `MyNewEffect.js`.
2.  **Scaffold the Scene**: Use the following template:

    ```javascript
    import Phaser from 'phaser';
    import { createPane } from '../../ui/createPane';

    export default class MyNewEffect extends Phaser.Scene {
      constructor() {
        super('MyNewEffect'); // Unique Key
      }

      create() {
        // 1. Add visual elements
        this.add.text(20, 20, 'My New Effect', { fontSize: '24px' });

        // 2. Setup Tweakpane
        if (this.pane) this.pane.dispose();
        this.pane = createPane('My Controls');

        // 3. Add interactions
        this.pane.addButton({ title: 'Back to Menu' }).on('click', () => {
          this.scene.start('MenuScene');
        });

        // Cleanup on exit
        this.events.once('shutdown', () => {
          if (this.pane) this.pane.dispose();
        });
      }
    }
    ```
3.  **Save**: The server will reload, and your new effect will appear in the Main Menu list automatically!

### Using "Juice" Effects
The custom `phaserJuice` plugin is available in all scenes via `this.juice`.
```javascript
// Example: Pulse an object
const btn = this.add.image(100, 100, 'btn');
this.juice.pulse(btn, { repeat: -1 });
```

---

## 📦 Key Libraries

*   **[Phaser 3](https://phaser.io/)**: The core game engine.
*   **[Tweakpane](https://tweakpane.github.io/docs/)**: UI for parameter tweaking.
*   **[Vite](https://vitejs.dev/)**: Fast development build tool.

## ⚠️ Troubleshooting

*   **New scene not showing up?**
    *   Ensure the class is the `default export`.
    *   Ensure the file is directly inside `src/scenes/effects/`.
    *   Check the console for "Duplicate scene class" warnings. Each Scene class needs a unique name in `super('Name')`.

*   **UI Controls duplicating?**
    *   Make sure to call `this.pane.dispose()` in the `shutdown` event listener to clean up the UI when switching scenes.
