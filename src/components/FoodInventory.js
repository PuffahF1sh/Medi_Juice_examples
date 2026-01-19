/**
 * Creates a Food Inventory UI component
 * @param {Phaser.Scene} scene - The scene instance
 * @param {Function} onItemClick - Callback function when an item is clicked, receives (itemKey, index)
 * @returns {Phaser.GameObjects.Container} The inventory container
 */
export function createFoodInventory(scene, onItemClick) {
  const invW = 114, invH = 214;
  const invContainer = scene.add.container(0, 0);
  invContainer.setSize(invW, invH);

  // Inventory Background
  const invBg = scene.add.graphics();
  invBg.fillStyle(0xBECCFF, 1);
  invBg.fillRoundedRect(-invW / 2, -invH / 2, invW, invH, { tl: 0, tr: 8, bl: 0, br: 8 });
  invBg.lineStyle(2, 0x8D92F5, 1);
  invBg.strokeRoundedRect(-invW / 2, -invH / 2, invW, invH, { tl: 0, tr: 8, bl: 0, br: 8 });
  invContainer.add(invBg);

  // Inventory Items
  const itemKeys = ['emberfruit', 'chameleonSlug', 'elderMoss', null];
  const itemSize = 44, itemSpacing = 8;
  const slotColors = [0xFF66B9, 0xFFCB67, 0xAF67DB];

  let currentY = -invH / 2 + 7 + itemSize / 2;

  itemKeys.forEach((key, index) => {
    const slotContainer = scene.add.container(itemSize / 2 + itemSpacing, currentY);
    const itemBg = scene.add.graphics();
    const slotColor = slotColors[index] || 0xE5EBFF;

    itemBg.fillStyle(slotColor, 1);
    itemBg.fillRoundedRect(-itemSize / 2, -itemSize / 2, itemSize, itemSize, 8);
    slotContainer.add(itemBg);

    if (key) {
      const itemIcon = scene.add.image(0, 0, key).setDisplaySize(itemSize, itemSize);
      slotContainer.add(itemIcon);
    }

    invContainer.add(slotContainer);

    // Interaction
    slotContainer.setInteractive(new Phaser.Geom.Rectangle(-itemSize / 2, -itemSize / 2, itemSize, itemSize), Phaser.Geom.Rectangle.Contains);
    slotContainer.on('pointerdown', () => {
      scene.tweens.add({
        targets: slotContainer,
        scale: 0.9,
        duration: 50,
        yoyo: true,
        onComplete: () => {
          if (onItemClick) {
            onItemClick(key, index);
          }
        }
      });
    });

    currentY += itemSize + itemSpacing;
  });

  return invContainer;
}
