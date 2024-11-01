const _Game_Action_apply = Game_Action.prototype.apply;

Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.call(this, target);

    if (typeof this.isCritical === 'function') {
        console.log('isCritical method exists and is a function.');

        if (this.isCritical()) {
            AudioManager.playSe({ name: 'PK_SMAAASH', pan: 0, pitch: 100, volume: 90 });
        }
    } else {
        console.log('Error: isCritical method is not available.');
    }
};
