# Phaser Effect Lab

Welcome to **Phaser Effect Lab**! This project is a prototyping environment designed for designers and developers to rapidly create, tweak, and test visual effects for the Phaser 3 engine. It uses a modular architecture that makes effects reusable and easy to manage.

## Project Status

This project is in active development.

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### 2. Installation
Navigate to the project directory and install dependencies:
```bash
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
│   ├── main.js                 # Entry point: Configures the game and scenes
│   ├── ui/
│   │   └── createPane.js       # Helper for creating Tweakpane controls
│   ├── scenes/
│   │   ├── MenuScene.js        # The main menu that lists all effects
│   │   └── EffectShowcaseScene.js # A dedicated scene for testing a single effect
│   ├── effects/                # 🧪 YOUR PLAYGROUND
│   │   ├── BaseEffect.js       # The base class all effects should extend
│   │   ├── EffectManager.js    # Manages the lifecycle of effects
│   │   └── ButtonPulseEffect.js # An example of a reusable effect
│   └── scenes/effects/
│       └── index.js            # Auto-loader for effect classes
├── assets/                     # Images and other static assets
├── phaser3-juice-plugin/       # A local plugin for juicy effects
└── package.json
```

---

## 🛠️ How It Works

### Modular and Reusable Effects
This project is built around a modular effect architecture. Instead of creating a new scene for each effect, you create a JavaScript class that extends `BaseEffect`. These effect classes encapsulate the logic for a single visual effect, making them reusable across different game objects and scenes.

### The Effect Showcase
To test an effect, the `MenuScene` loads it into the `EffectShowcaseScene`. This provides a consistent environment for tweaking the effect's parameters in real-time using Tweakpane.

### Automatic Effect Loading
The file `src/scenes/effects/index.js` automatically detects and exports any effect classes you add to it. The `MenuScene` then reads this file to generate the list of available effects.

---

## 🧪 How to Create a New Effect

1.  **Create a File**: Add a new file in `src/effects/`, e.g., `MyAwesomeEffect.js`.

2.  **Extend `BaseEffect`**: Use the following template to create your effect class.

    ```javascript
    // src/effects/MyAwesomeEffect.js
    import BaseEffect from './BaseEffect';

    export default class MyAwesomeEffect extends BaseEffect {
      constructor(scene, target, config = {}) {
        super(scene, target);
        this.params = {
          // Define your tweakable parameters here
          intensity: config.intensity || 1.0,
        };
      }

      setupPane(pane) {
        // Add Tweakpane controls for your parameters
        const folder = pane.addFolder({ title: 'My Awesome Effect' });
        folder.addInput(this.params, 'intensity', { min: 0, max: 2 })
          .on('change', () => this.apply());
      }

      apply() {
        // Implement the core logic of your effect here
        // This method is called whenever a parameter is changed
        console.log(`Applying effect with intensity: ${this.params.intensity}`);
        // Example: this.scene.tweens.add({...});
      }

      destroy() {
        // Optional: Clean up any resources your effect created
      }
    }
    ```

3.  **Register the Effect**: Open `src/scenes/effects/index.js` and add your new class to the `effects` array.

    ```javascript
    // src/scenes/effects/index.js
    import ButtonPulseEffect from '../../effects/ButtonPulseEffect';
    import MyAwesomeEffect from '../../effects/MyAwesomeEffect'; // 1. Import it

    const effects = [
      ButtonPulseEffect,
      MyAwesomeEffect, // 2. Add it to the array
    ];

    export default effects;
    ```

4.  **Save**: The development server will automatically reload, and your new effect will appear in the main menu, ready to be tested in the showcase scene!

---

## 📦 Key Libraries

*   **[Phaser 3](https://phaser.io/)**: The core game engine.
*   **[Tweakpane](https://tweakpane.github.io/docs/)**: A UI for tweaking parameters in real-time.
*   **[Vite](https://vitejs.dev/)**: A fast development build tool.
