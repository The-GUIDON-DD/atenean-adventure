class ComputeResults extends RenJS.Plugin {
  async onCall() {
    const scores = {
      thinker: this.game.managers.logic.vars["thinker_score"],
      socialeagle: this.game.managers.logic.vars["socialeagle_score"],
      innovator: this.game.managers.logic.vars["innovator_score"],
      latinhonors: this.game.managers.logic.vars["latinhonors_score"],
    };

    const maxKeyByScore = Object.keys(scores).reduce((a, b) =>
      scores[a] >= scores[b] ? a : b,
    );

    this.game.managers.logic.vars["future_self"] = maxKeyByScore;
    this.game.resolveAction();
  }
}

RenJSGame.addPlugin("computeResults", ComputeResults);
