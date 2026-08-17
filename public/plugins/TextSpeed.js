
/**
 * TextSpeed plugin for RenJS derived from the Fadetime plugin.
 * 
 * This plugin allows you to set a text speed for transitions at specific points.
 * You can change the text speed dynamically by calling 'textspeed' in your story.
 * @example
 * - call textspeed 0            // set text speed to 0%, or instant
 * - call textspeed reset            // restore default text speed
 */
class TextSpeed extends RenJS.Plugin {

    onInit() {
        this.defaultSpeed = this.game.storyConfig.userPreferences.textSpeed;
    }

    onCall(params) {
        const preferences = this.game.userPreferences.preferences;
        const value = params.body;
        const textSpeed = (value === 'reset' || value == null) ? this.defaultSpeed : parseInt(value, 10);
        const clampedValue = clamp(value, preferences.textSpeed.min, preferences.textSpeed.max)
        this.game.userPreferences.set('textSpeed', textSpeed);
        this.game.resolveAction();
    }

    onTeardown() {
        this.game.userPreferences.preferences.textSpeed.value = this.defaultSpeed;
    }
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

RenJSGame.addPlugin('textSpeed', TextSpeed);