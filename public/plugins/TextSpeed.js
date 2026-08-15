
/**
 * TextSpeed plugin for RenJS derived from the Fadetime plugin.
 * 
 * This plugin allows you to set a text speed for transitions at specific points.
 * You can change the text speed dynamically by calling 'textspeed' in your story.
 * @example
 * - call textspeed 500              // set text speed to 500ms
 * - call textspeed reset            // restore default text speed
 */
class TextSpeed extends RenJS.Plugin {

    onInit() {
        this.defaultSpeed = this.game.storyConfig.textspeed;
    }

    onCall(params) {
        const value = params.body;
        this.game.storyConfig.textspeed =
            (value === 'reset' || value == null) ? this.defaultSpeed : parseInt(value, 10);
        this.game.resolveAction();
    }

    onTeardown() {
        this.game.storyConfig.textspeed = this.defaultSpeed;
    }
}

RenJSGame.addPlugin('textSpeed', TextSpeed);