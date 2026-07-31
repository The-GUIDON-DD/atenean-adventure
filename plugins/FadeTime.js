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