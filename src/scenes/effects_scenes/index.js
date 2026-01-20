// Dynamically import all scene files in this directory
const modules = import.meta.glob('./*.js', { eager: true });

// Filter out this index file if it gets picked up, and extract default exports (the Scene classes)
const scenes = [];
const seenNames = new Set();

Object.keys(modules).forEach((path) => {
  // Skip this index file and the effect template
  if (path.includes('index.js') || path.includes('effectTemplate.js')) return;

  const SceneClass = modules[path].default;

  // Ensure we have a valid class
  if (!SceneClass || !SceneClass.name) return;

  // Prevent duplicate scenes (same class name) from crashing the app
  if (seenNames.has(SceneClass.name)) {
    console.warn(`Duplicate scene class '${SceneClass.name}' found in ${path}. Skipping.`);
    return;
  }

  seenNames.add(SceneClass.name);
  scenes.push(SceneClass);
});

export default scenes;
