"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareFake = void 0;
class HardwareFake {
    constructor() {
        this._moneyInsertedCallback = () => { };
        this._invocationsMakeACoffee = 0;
        this._sugarSelectedCallback = () => { };
    }
    MakeACoffee() {
        this._invocationsMakeACoffee++;
        return true;
    }
    RegisterMoneyInsertedCallback(callback) {
        this._moneyInsertedCallback = callback;
    }
    RegisterSugarSelectedCallback(callback) {
        this._sugarSelectedCallback = callback;
    }
    SimulerInsertionPièce(pièce) {
        this._moneyInsertedCallback(pièce.getMontant());
    }
    SimulerSelectionerSucre(hasSugar) {
        this._sugarSelectedCallback(hasSugar);
    }
    SimulerReservoirSucreVide() {
        this._sugarSelectedCallback(false);
    }
    CountInvocationsMakeACoffee() {
        return this._invocationsMakeACoffee;
    }
}
exports.HardwareFake = HardwareFake;
