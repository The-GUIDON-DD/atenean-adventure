
/**
 * TextSpeed plugin for RenJS derived from the Fadetime plugin.
 * 
 * This plugin allows you to set a text speed for transitions at specific points.
 * You can change the text speed dynamically by calling 'textSpeed' in your story.
 * Note: Text speed is inverted, which means the higher the value, the faster, and vice versa.
 * @example
 * - call textSpeed: 100            // set text speed to fastest, which skips the animation text
 * - call textSpeed: reset            // restore default text speed
 */
class TextSpeed extends RenJS.Plugin {

    onInit() {
        this.defaultSpeed = this.game.storyConfig.userPreferences.textSpeed;
    }

    onCall(params) {
        const preferences = this.game.userPreferences.preferences;
        const {min, max} = preferences.textSpeed
        const value = params.body;

        const textSpeed = (value === 'reset' || value == null) ? this.defaultSpeed : parseInt(value, 10);
        const clampedValue = clamp(textSpeed, min, max);
        const normalizedValue = (clampedValue - min) / (max - min);

        this.game.userPreferences.set('textSpeed', normalizedValue);
        this.game.resolveAction();
    }

    onTeardown() {
        this.game.userPreferences.preferences.textSpeed.value = this.defaultSpeed;
    }
}

/**
 * A helper function to ensure that the inputted value stays within bounds.
 * @param {*} value 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

RenJSGame.addPlugin('textSpeed', TextSpeed);