
/**
 * Fadetime plugin for RenJS
 * 
 * This plugin allows you to set a fade time for transitions at specific points.
 * You can change the fade time dynamically by calling 'fadetime' in your story.
 * @example
 * - call fadetime 500              // set fade time to 500ms
 * - call fadetime reset            // restore default fade time
 */
class Fadetime extends RenJS.Plugin {

    onInit() {
        this.defaultTime = this.game.storyConfig.fadetime;
    }

    onCall(params) {
        const value = params.body;
        this.game.storyConfig.fadetime =
            (value === 'reset' || value == null) ? this.defaultTime : parseInt(value, 10);
        this.game.resolveAction();
    }

    onTeardown() {
        this.game.storyConfig.fadetime = this.defaultTime;
    }
}

RenJSGame.addPlugin('fadetime', Fadetime);