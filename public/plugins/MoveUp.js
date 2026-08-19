const FINAL_Y_COORD = 620

/**
 * Transition that is specifically used to move up the MessageBox to make room for the choice grid.
 * The destination y-coordinate is hardcoded.
 */
class MoveUp extends RenJS.Plugin {
    onInit(){
        this.game.screenEffects.transition['MoveUp'] = (from, to, position, scaleX) => {
            // When a choice is made, it uses the same transition but without a "to" parameter
            if (to == null) { return this.game.screenEffects.transition.CUT(from, from, from.position)}
            
            // Regular linear tween based on Transition.MOVE()
            return new Promise(resolve => {
                this.game.managers.tween.tween(to, {x: to.position.x, y: FINAL_Y_COORD}, () => {
                    console.log("Tween Finished");
                    to.alpha = 1;
                    resolve();
                }, to.config.transitionTime, true, 0, false);
            });
        }
    }
}

RenJSGame.addPlugin('moveUp', MoveUp);