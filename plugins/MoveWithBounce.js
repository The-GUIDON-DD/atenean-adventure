/**
 * Taken from https://stackoverflow.com/a/25349431
 */
function bounceEasing (v) {
    return Math.sin(v * Math.PI) * -1; 
};

/**
 * Transition that automatically calculates the number of bounces. Will not have the same transition duration with other sprites.
 */
class MoveWithBounce extends RenJS.Plugin {
    onInit(){
        this.game.screenEffects.transition['MoveWithBounce'] = (from, to, position, scaleX) => {
            return new Promise(resolve => {
                const settings = this.game.storyConfig.moveWithBounceSettings;
                const duration = Math.abs(from.x - position.x) * 3.3;
                const bounceHeight = settings.bounceHeight;
                const bounces = Math.ceil(Math.abs(from.x - position.x) / 40) || 1;
                
                // Code taken from https://stackoverflow.com/a/25349431
                const move = this.game.add.tween(from);
                const jump = this.game.add.tween(from);
                move.to({x: position.x}, duration).start();
                jump.to({y: position.y - bounceHeight}, duration/bounces, bounceEasing, true, 0, -1, 0);
                move.onComplete.addOnce(() => {
                    from.alpha = 0;
                    to.alpha = 1;
                    jump.stop()
                    resolve();
                });
            });
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
        console.log("Params", params.body);
        const settings = this.game.storyConfig.moveWithBounceSettings;
        console.log("Settings before: ", settings)
        settings.movetime = params.body.movetime ?? settings.movetime;
        settings.bounceCount = params.body.bounceCount ?? settings.bounceCount;
        settings.bounceHeight = params.body.bounceHeight ?? settings.bounceHeight;
        console.log("Settings", settings);
        this.game.resolveAction();
    }

    onInit(){
        this.defaultSettings = game.storyConfig.moveWithBounceSettings;
        this.game.screenEffects.transition['MoveWithBounceManual'] = (from, to, position, scaleX) => {
            return new Promise(resolve => {
                const settings = this.game.storyConfig.moveWithBounceSettings;
                console.log("Called", settings);
                const duration = settings.movetime;
                const bounceHeight = settings.bounceHeight;
                const bounces = settings.bounceCount || 1;
                
                // Code taken from https://stackoverflow.com/a/25349431
                const move = this.game.add.tween(from);
                const jump = this.game.add.tween(from);
                move.to({x: position.x}, duration).start();
                jump.to({y: position.y - bounceHeight}, duration/bounces, bounceEasing, true, 0, -1, 0);
                move.onComplete.addOnce(() => {
                    from.alpha = 0;
                    to.alpha = 1;
                    jump.stop()
                    resolve();
                });
            });
        }
    }

    onTeardown(){
        this.game.storyConfig.moveWithBounceSettings = this.defaultSettings;
    }
}
RenJSGame.addPlugin('moveWithBounce', MoveWithBounce)
RenJSGame.addPlugin('moveWithBounceManual', MoveWithBounceManual)