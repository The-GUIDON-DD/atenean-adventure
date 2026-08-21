/* Animate multiple objects at the same time */

class MultiAnimate extends RenJS.Plugin {
  onCall(params) {
    const duration = params.duration || 750;
    const anims = params.animations || [];

    anims.forEach((anim) => {
      // Access game assets and Phaser instance from `this.game`
      const sprite =
        this.game.gui.elements[anim.target] ||
        (this.game.storyHandler.cgs && this.game.storyHandler.cgs[anim.target]);

      if (sprite) {
        this.game.add.tween(sprite).to(
          {
            x: anim.x ?? sprite.x,
            y: anim.y ?? sprite.y,
            alpha: anim.alpha ?? 1,
            angle: anim.angle ?? sprite.angle,
            zoom: anim.zoom ?? sprite.zoom,
          },
          duration,
          Phaser.Easing.Quadratic.Out,
          true,
        );
      }
    });

    // Resolving immediately keeps execution non-blocking
    this.resolveAction();
  }
}

RenJSGame.addPlugin("MultiAnimate", MultiAnimate);
