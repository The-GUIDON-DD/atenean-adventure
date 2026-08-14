const choiceButton = {width: 552, height: 82}
const messageBoxDims = {width: 600, height: 200}

function patchChoicesToGrid(game, config, id) {
    const handler = game.gui.hud.cHandlers[id];
    
    if (!handler) {
        console.error(`choices element with id: ${id} does not exist.`);
        return; 
    }

    const originalCreateChoiceBox = handler.createChoiceBox.bind(handler);

    // Disclaimer: This code was aided by Claude.
    handler.createChoiceBox = function(choice, x, y, index, totalChoices, resolve) {
        
        const chBox = originalCreateChoiceBox(choice, x, y, index, totalChoices, resolve);

        // Use dedicated H/V separation, falling back to the dimension-agnostic separation, then 0
        const gapH = this.config.separationH || this.config.separation || 0;
        const gapV = this.config.separationV || this.config.separation || 0;
        
        const col = Math.floor(index / 2);
        const row = index % 2;

        // Calculate total grid dimensions using the specific gaps
        const gridWidth = (chBox.width * 2) + gapH;
        const gridHeight = (chBox.height * 2) + gapV;

        // Find the top-left corner to center the grid on the config x/y
        const startX = this.config.x - (gridWidth / 2);
        const startY = this.config.y - (gridHeight / 2);

        // Apply final coordinates using the specific gaps
        chBox.x = startX + (col * (chBox.width + gapH));
        chBox.y = startY + (row * (chBox.height + gapV));

        // Adds context to the label for vertical alignment
        chBox.label.setTextBounds(0, 0, choiceButton.width, choiceButton.height);

        return chBox;
    };
}

function patchMessageBoxChoice(game, config, id) {
    const mBox = game.gui.hud.mBoxes[id];
    if (!mBox) {
        console.error(`messageBox element with id: ${id} does not exist.`);
        return; 
    }
    const {width, height} = mBox._frame;
    mBox.text.setTextBounds(0, 0, width, height);
}

class GridChoice extends RenJS.Plugin {
    onInit() {
        patchChoicesToGrid(this.game, this.config, 'grid');
        patchMessageBoxChoice(this.game, this.config, 'choice');
        patchMessageBoxChoice(this.game, this.config, 'default');
    }
}

RenJSGame.addPlugin('gridChoice', GridChoice);