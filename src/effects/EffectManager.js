// src/effects/EffectManager.js
import { Pane } from 'tweakpane';

/**
 * @class EffectManager
 * @description Manages the lifecycle of effects applied to game objects.
 * It handles the creation of the Tweakpane UI, as well as the updating
 * and destruction of all active effects.
 */
export default class EffectManager {
  /**
   * @param {Phaser.Scene} scene - The scene that owns this manager.
   */
  constructor(scene) {
    this.scene = scene;
    this.effects = [];
    this.pane = new Pane({
      title: 'Effect Controls',
      expanded: true,
    });

    this.pane.element.style.position = 'fixed';
    this.pane.element.style.top = '10px';
    this.pane.element.style.right = '10px';
    this.pane.element.style.zIndex = 9999;

    // The EffectManager's update method should be called from the scene's update loop.
    this.scene.events.on('update', this.update, this);
    // The EffectManager's destroy method should be called from the scene's shutdown event.
    this.scene.events.once('shutdown', this.destroy, this);
  }

  /**
   * Applies an effect to a target game object.
   * @param {Phaser.GameObjects.GameObject} target - The game object to apply the effect to.
   * @param {typeof BaseEffect} EffectClass - The effect class to instantiate.
   * @param {object} [config={}] - Configuration options for the effect.
   * @returns {BaseEffect} The created effect instance.
   */
  addEffect(target, EffectClass, config = {}) {
    const effect = new EffectClass(this.scene, target, config);
    effect.setupPane(this.pane);
    effect.apply();
    this.effects.push(effect);
    return effect;
  }

  /**
   * Updates all active effects. This is called automatically by the scene's update event.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {
    for (const effect of this.effects) {
      if (effect.update) {
        effect.update(time, delta);
      }
    }
  }

  /**
   * Destroys all effects and the Tweakpane UI.
   * This is called automatically when the scene shuts down.
   */
  destroy() {
    for (const effect of this.effects) {
      if (effect.destroy) {
        effect.destroy();
      }
    }
    this.effects = [];
    if (this.pane) {
      this.pane.dispose();
      this.pane = null;
    }
  }
}
