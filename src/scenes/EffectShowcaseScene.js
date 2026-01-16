// src/scenes/EffectShowcaseScene.js
import Phaser from 'phaser';
import EffectManager from '../effects/EffectManager';

/**
 * @class EffectShowcaseScene
 * @extends Phaser.Scene
 * @description A scene for showcasing and tweaking a single effect.
 * It receives an Effect class via scene data, instantiates it, and applies it to a target.
 */
export default class EffectShowcaseScene extends Phaser.Scene {
  constructor() {
    super('EffectShowcaseScene');
    this.effectManager = null;
    this.EffectClass = null;
  }

  init(data) {
    // Receive the effect class from the scene that started this one
    this.EffectClass = data.effectClass;
  }

  preload() {
    // Preload assets needed for the showcase.
    // In a real project, you might load assets based on the effect being shown.
    this.load.image('BG', 'assets/ButtonPulse_BG.png');
    this.load.image('button', 'assets/ButtonPulse_btn.png');
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    // --- Scene Setup ----------------------------------------------------
    this.add.image(centerX, centerY, 'BG');
    const target = this.add.image(centerX, centerY, 'button');

    // --- EffectManager and UI -------------------------------------------
    this.effectManager = new EffectManager(this);
    this.effectManager.addEffect(target, this.EffectClass);

    // Add a back button to the pane, managed by EffectManager
    this.effectManager.pane.addButton({ title: 'Back to Menu' }).on('click', () => {
      this.scene.start('MenuScene');
    });

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });
  }
}
