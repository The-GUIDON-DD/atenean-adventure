/**
 * Custom button to mute/unmute audio
 */
class ToggleAudio extends RenJS.Plugin {
  muted = false;

  onInit(params) {
    this.toggle = () => {
      this.muted = !this.muted;
      this.game.managers.audio.mute(this.muted);
    };

    this.game.gui.bindingActions["toggleAudio"] = this.toggle;
  }

  onCall() {
    this.toggle();
    this.game.resolveAction();
  }
}

RenJSGame.addPlugin("toggleAudio", ToggleAudio);
