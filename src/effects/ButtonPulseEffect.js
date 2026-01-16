// src/effects/ButtonPulseEffect.js
import BaseEffect from './BaseEffect';

/**
 * @class ButtonPulseEffect
 * @extends BaseEffect
 * @description Creates a pulsing effect on a target game object.
 * The pulsing is achieved by tweening the scale of the target.
 */
export default class ButtonPulseEffect extends BaseEffect {
  /**
   * @param {Phaser.Scene} scene - The scene this effect belongs to.
   * @param {Phaser.GameObjects.GameObject} target - The game object to apply the effect to.
   * @param {object} [config={}] - Configuration for the effect.
   */
  constructor(scene, target, config = {}) {
    super(scene, target);
    this.target = target;

    // Default parameters that can be tweaked
    this.params = {
      frequency: config.frequency || 500, // Duration of one pulse cycle
      minScale: config.minScale || 0.9,   // Minimum scale
      maxScale: config.maxScale || 1.1,   // Maximum scale
    };
  }

  /**
   * Sets up the Tweakpane controls for the pulse effect.
   * @param {Tweakpane} pane - The Tweakpane instance.
   */
  setupPane(pane) {
    const folder = pane.addFolder({ title: 'Pulse Effect' });
    folder.addInput(this.params, 'frequency', { min: 100, max: 2000, step: 50 })
      .on('change', () => this.apply());
    folder.addInput(this.params, 'minScale', { min: 0.1, max: 1.0, step: 0.05 })
      .on('change', () => this.apply());
    folder.addInput(this.params, 'maxScale', { min: 1.0, max: 2.0, step: 0.05 })
      .on('change', () => this.apply());
  }

  /**
   * Applies the pulsing effect to the target.
   * It uses the phaserJuice plugin to create the pulse tween.
   */
  apply() {
    // Stop any existing pulse tweens on the target
    if (this.target.pulseTween) {
      this.target.pulseTween.stop();
      this.target.pulseTween = null;
    }

    // Use the phaserJuice plugin to create the pulse effect with current params
    this.target.pulseTween = this.scene.juice.add(this.target).pulse({
      frequency: this.params.frequency,
      minScale: this.params.minScale,
      maxScale: this.params.maxScale
    }, {
      repeat: -1 // Loop indefinitely
    });
  }

  /**
   * Cleans up the effect by stopping the tween.
   */
  destroy() {
    if (this.target.pulseTween) {
      this.target.pulseTween.stop();
      this.target.pulseTween = null;
    }
  }
}
