"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareFake = void 0;
const HardwareDummy_1 = require("./HardwareDummy");
class HardwareFake extends HardwareDummy_1.HardwareDummy {
    constructor() {
        super(...arguments);
        this._moneyInsertedCallback = () => { };
        this._invocationsMakeACoffee = 0;
        this._sugarSelectedCallback = () => { };
        this._buttonPressedCallback = () => { };
    }
    RegisterButtonPressedCallback(callback) {
        this._buttonPressedCallback = callback;
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
    SimulerAppuieSurunBouton(buttonCode) {
        this._buttonPressedCallback(buttonCode);
    }
    CountInvocationsMakeACoffee() {
        return this._invocationsMakeACoffee;
    }
}
exports.HardwareFake = HardwareFake;
