// src/scenes/effects/index.js
import ButtonPulseEffect from '../../effects/ButtonPulseEffect';

// This file now exports a list of effect *classes* that can be dynamically
// loaded and showcased in the EffectShowcaseScene.
const effects = [
  ButtonPulseEffect,
  // Add other refactored effect classes here as they are created
];

export default effects;
