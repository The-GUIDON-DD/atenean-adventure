class CharacterSelect extends RenJS.Plugin {
  onCall(params) {
    const { characters, confirmX, confirmY, confirmSprite, varName } =
      params.body;

    this.varName = varName || "selected_char";
    this.selectedId = null;
    this.buttons = {};

    characters.forEach((ch) => {
      const btn = this.game.add.button(
        ch.x,
        ch.y,
        ch.spriteKey,
        () => this.selectCharacter(ch.id, btn),
        this,
        1,
        0,
        0,
        1,
      );
      btn.anchor.set(0.5); // center anchor
      this.buttons[ch.id] = btn;
    });

    this.confirmButton = this.game.add.button(
      confirmX,
      confirmY,
      confirmSprite,
      () => this.confirm(),
      this,
      0,
      0,
      0,
      0,
    );
    this.confirmButton.alpha = 0.5;
  }

  selectCharacter(id, clickedBtn) {
    if (this.selectedId && this.buttons[this.selectedId]) {
      this.buttons[this.selectedId].setFrames(1, 0, 0, 1);
    }

    clickedBtn.setFrames(2, 2, 2, 2);
    this.selectedId = id;
    this.game.managers.logic.setVar(this.varName, id);
    this.confirmButton.alpha = 1;
  }

  confirm() {
    if (!this.selectedId) return;
    Object.values(this.buttons).forEach((b) => b.destroy());
    this.confirmButton.destroy();
    this.game.resolveAction();
  }
}

RenJSGame.addPlugin("characterSelect", CharacterSelect);
