"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pièce = void 0;
class Pièce {
    getMontant() {
        return this._montant;
    }
    constructor(montant) {
        this._montant = montant;
    }
    EstInférieureA(comparée) {
        return this._montant < comparée._montant;
    }
    toString() {
        return this._montant.toString() + 'cts';
    }
    static Parse(montant) {
        switch (montant) {
            case 1:
                return Pièce.UnCentime;
            case 2:
                return Pièce.DeuxCentimes;
            case 5:
                return Pièce.CinqCentimes;
            case 10:
                return Pièce.DixCentimes;
            case 20:
                return Pièce.VingtCentimes;
            case 50:
                return Pièce.CinquanteCentimes;
            case 100:
                return Pièce.UnEuro;
            case 200:
                return Pièce.DeuxEuros;
            default:
                throw new Error();
        }
    }
}
exports.Pièce = Pièce;
Pièce.DeuxEuros = new Pièce(200);
Pièce.UnEuro = new Pièce(100);
Pièce.CinquanteCentimes = new Pièce(50);
Pièce.VingtCentimes = new Pièce(20);
Pièce.DixCentimes = new Pièce(10);
Pièce.CinqCentimes = new Pièce(5);
Pièce.DeuxCentimes = new Pièce(2);
Pièce.UnCentime = new Pièce(1);
