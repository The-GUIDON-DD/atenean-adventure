/**
 * Adds bounds to the message box text so that it is able to be vertically aligned when the text is multiline. 
 * @param {*} game - The RenJS game instance
 * @param {*} config - The configuration object for RenJS
 * @param {*} id - The ID of the message box to patch
 */
function patchMessageBoxBounds(game, config, id) {
    const mBox = game.gui.hud.mBoxes[id];
    if (!mBox) {
        console.error(`messageBox element with id: ${id} does not exist.`);
        return; 
    }
    const {width, height} = mBox._frame;
    mBox.text.setTextBounds(0, 0, width, height);
}

class VerticalAlignment extends RenJS.Plugin {
    onInit() {
        patchMessageBoxBounds(this.game, this.config, 'choice');
        patchMessageBoxBounds(this.game, this.config, 'default');
    }
}

RenJSGame.addPlugin('verticalAlignment', VerticalAlignment);
