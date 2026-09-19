class ShowFutureSelfText extends RenJS.Plugin {
  async onCall(params) {
    this.showFutureSelfText();
    this.game.resolveAction();
  }

  getFutureSelfLabel() {
    if ("future_self" in this.game.managers.logic.vars) {
      const futureKey = this.game.managers.logic.vars["future_self"];
      const resultLabels = {
        thinker: "Future Independent Thinker",
        socialeagle: "Future Social Eagle",
        innovator: "Future Creative Innovator",
        latinhonors: "Future Latin Honors",
      };
      return resultLabels[futureKey];
    }
    return "";
  }

  showFutureSelfText() {
    this.game.lockScale = true;
    const futureLabel = document.createElement("span");
    futureLabel.id = "future-self";
    futureLabel.style.fontFamily = "ysabeau-infant";
    futureLabel.style.textAlign = "center";
    futureLabel.style.position = "absolute";
    futureLabel.innerText = this.getFutureSelfLabel();
    futureLabel.style.color = "#000000";
    futureLabel.style.border = "5px solid black";
    console.log("Future Self Label: ", futureLabel);

    const scale = this.game.scale.width / this.game.width;
    const textProps = {
      x: 200,
      y: 200,
      fontSize: 25,
      width: 400,
      height: 200,
    };

    const canvas = this.game.canvas;
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    const topLeft = [
      canvasWidth / 2 - this.game.scale.width / 2 + canvas.offsetLeft,
      canvasHeight / 2 - this.game.scale.height / 2 + canvas.offsetTop,
    ];
    futureLabel.style.left = topLeft[0] + textProps.x * scale + "px";
    futureLabel.style.top = topLeft[1] + textProps.y * scale + "px";
    futureLabel.style.width = textProps.width * scale + "px";
    futureLabel.style.height = textProps.height * scale + "px";
    futureLabel.style.fontSize = textProps.fontSize * scale + "px";
    return futureLabel;
  }
}

RenJSGame.addPlugin("ShowFutureSelfText", ShowFutureSelfText);
