import Phaser from "phaser";
import MenuScene from "./scenes/MenuScene";
import effects from "./scenes/effects/index";
import phaserJuice from "../phaser3-juice-plugin/dist/phaserJuicePlugin.min.js";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#0d0d0d',
  parent: 'game-container',
  scene: [
    MenuScene,
    ...effects
  ],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  plugins: {
    scene: [
      { key: 'phaserJuice', plugin: phaserJuice, mapping: 'juice' }
    ]
  },
};

new Phaser.Game(config);