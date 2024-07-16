"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareFakeDecorator = void 0;
const HardwareFake_1 = require("./HardwareFake");
class HardwareFakeDecorator extends HardwareFake_1.HardwareFake {
    constructor(decorated) {
        super();
        this._decorated = decorated;
    }
    RegisterMoneyInsertedCallback(callback) {
        this._decorated.RegisterMoneyInsertedCallback(callback);
    }
    FlushStoredMoney() {
        this._decorated.FlushStoredMoney();
    }
    CollectStoredMoney() {
        this._decorated.CollectStoredMoney();
    }
    IsCupPresent() {
        return this._decorated.IsCupPresent();
    }
    ProvideCup() {
        return this._decorated.ProvideCup();
    }
    RegisterButtonPressedCallback(callback) {
        return this._decorated.RegisterButtonPressedCallback(callback);
    }
    MakeACoffee() {
        return this._decorated.MakeACoffee();
    }
    TryPullWater() {
        return this._decorated.TryPullWater();
    }
    PourMilk() {
        return this._decorated.PourMilk();
    }
    PourWater() {
        return this._decorated.PourWater();
    }
    PourSugar() {
        return this._decorated.PourSugar();
    }
}
exports.HardwareFakeDecorator = HardwareFakeDecorator;
