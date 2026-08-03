/**
 * Taken from https://stackoverflow.com/a/25349431
 */
function bounceEasing (v) {
    return Math.sin(v * Math.PI) * -1; 
};

/**
 * Runes the bounce animation
 * Taken from https://stackoverflow.com/a/25349431
 */
function bounceTween (game, position, from, to, duration, bounceHeight, bounces) {
    return new Promise(resolve => {
        const move = game.add.tween(from);
        const jump = game.add.tween(from);
        move.to({x: position.x}, duration).start();
        jump.to({y: position.y - bounceHeight}, duration/bounces, bounceEasing, true, 0, -1, 0);

        // In accordance with other RenJS transitions, the from sprite is hidden and the to sprite is shown when the transition is complete.
        move.onComplete.addOnce(() => {
            from.alpha = 0;
            to.alpha = 1;
            jump.stop()
            resolve();
        });
    })
}

// Both based on visual aesthetic.
const DURATION_MULTIPLIER = 3.3; // The higher the multiplier, the slower the sprite moves across the screen.
const PIXELS_PER_BOUNCE = 40; // The higher the number, the less bounces will occur.
/**
 * Transition that automatically calculates the number of bounces. Will not have the same transition duration with other sprites.
 */
class MoveWithBounce extends RenJS.Plugin {
    onInit(){
        this.game.screenEffects.transition['MoveWithBounce'] = (from, to, position, scaleX) => {
            const settings = this.game.storyConfig.moveWithBounceSettings;

            // Duration dictates how fast the sprite moves across the screen.
            // Calculated based on x-axis distance.
            const duration = Math.abs(from.x - position.x) * DURATION_MULTIPLIER;
            const bounceHeight = settings.bounceHeight;

            // Calculates the numebr of bounces based on the x-distance between the origin and destination.
            // Ciel is used to make bounces semi-consistent. Could use round instead if needed.
            const bounces = Math.ceil(Math.abs(from.x - position.x) / PIXELS_PER_BOUNCE) || 1;

            return bounceTween(this.game, position, from, to, duration, bounceHeight, bounces);
        }
    }
}

/**
 * Transition that uses the same transition duration and bounce count for all sprites.
 * The transition settings can be configured via the story config or by calling the method through the following example:
 * @example
 * - call moveWithBounceManual:
 *   movetime: 300
 *   bounceCount: 2
 *   bounceHeight: 50
 */
class MoveWithBounceManual extends RenJS.Plugin {
    onCall(params){
        const settings = this.game.storyConfig.moveWithBounceSettings;
        settings.movetime = params.body.movetime ?? settings.movetime;
        settings.bounceCount = params.body.bounceCount ?? settings.bounceCount;
        settings.bounceHeight = params.body.bounceHeight ?? settings.bounceHeight;
        this.game.resolveAction();
    }

    onInit(){
        this.defaultSettings = { ...this.game.storyConfig.moveWithBounceSettings };
        this.game.screenEffects.transition['MoveWithBounceManual'] = (from, to, position, scaleX) => {
            const settings = this.game.storyConfig.moveWithBounceSettings;
            const duration = settings.movetime;
            const bounceHeight = settings.bounceHeight;
            const bounces = settings.bounceCount || 1;
            return bounceTween(this.game, position, from, to, duration, bounceHeight, bounces);
        }
    }

    onTeardown(){
        this.game.storyConfig.moveWithBounceSettings = this.defaultSettings;
    }
}
RenJSGame.addPlugin('moveWithBounce', MoveWithBounce)
RenJSGame.addPlugin('moveWithBounceManual', MoveWithBounceManual)