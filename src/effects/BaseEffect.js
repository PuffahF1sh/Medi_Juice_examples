// src/effects/BaseEffect.js

/**
 * @class BaseEffect
 * @description A base class for creating reusable visual effects.
 * It provides a consistent structure for managing a target game object,
 * handling UI controls with Tweakpane, and applying the effect logic.
 */
export default class BaseEffect {
  /**
   * @param {Phaser.Scene} scene - The scene this effect belongs to.
   * @param {Phaser.GameObjects.GameObject} target - The game object to apply the effect to.
   */
  constructor(scene, target) {
    this.scene = scene;
    this.target = target;
    this.pane = null;
  }

  /**
   * Sets up the Tweakpane controls for this effect's parameters.
   * Subclasses should override this method to add their specific controls.
   * @param {Tweakpane} pane - The Tweakpane instance to add controls to.
   */
  setupPane(pane) {
    // This method should be overridden by subclasses to add specific controls.
    this.pane = pane;
  }

  /**
   * Applies the effect logic.
   * Subclasses must implement this method.
   */
  apply() {
    // This method should be overridden by subclasses to implement the effect.
    console.warn('The apply() method should be implemented by the subclass.');
  }

  /**
   * Updates the effect on each frame.
   * Subclasses can override this for continuous effects.
   * @param {number} time - The current time.
   * @param {number} delta - The delta time in ms since the last frame.
   */
  update(time, delta) {
    // Optional: override for effects that need continuous updates.
  }

  /**
   * Cleans up resources used by the effect, such as the Tweakpane pane.
   */
  destroy() {
    // This will be handled by the EffectManager's central pane.
    // If an effect creates its own specific resources, they should be cleaned up here.
  }
}
