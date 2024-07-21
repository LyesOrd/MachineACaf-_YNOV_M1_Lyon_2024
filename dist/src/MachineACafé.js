"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineACafé = void 0;
const Pi_ce_1 = require("./Pi\u00E8ce");
const Sucre_1 = require("./Sucre");
class MachineACafé {
    constructor(hardware) {
        this.argentEncaisséEnCentimes = 0;
        this.hasSugar = false;
        hardware.RegisterMoneyInsertedCallback((montant) => {
            this.insérer(Pi_ce_1.Pièce.Parse(montant));
        });
        hardware.RegisterSugarSelectedCallback((sugar) => {
            this.AselectionnerDuSucre(Sucre_1.Sucre.Parse(sugar));
        });
        this._hardware = hardware;
    }
    insérer(pièce) {
        if (pièce.EstInférieureA(MachineACafé.PrixDuCafé))
            return;
        this._hardware.MakeACoffee();
        this.argentEncaisséEnCentimes += pièce.getMontant();
    }
    AselectionnerDuSucre(sucre) {
        if (sucre.getSugarAmount() < 1)
            return;
        if (sucre.getSugarAmount() > 5)
            return;
        this._hardware.PourSugar();
        this.hasSugar = this._hardware.PourSugar();
    }
}
exports.MachineACafé = MachineACafé;
MachineACafé.PrixDuCafé = Pi_ce_1.Pièce.CinquanteCentimes;
