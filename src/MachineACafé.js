"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineACafé = void 0;
const Pi_ce_1 = require("./Pi\u00E8ce");
class MachineACafé {
    constructor(hardware) {
        this.argentEncaisséEnCentimes = 0;
        this.hasSugar = false;
        hardware.RegisterMoneyInsertedCallback((montant) => {
            this.insérer(Pi_ce_1.Pièce.Parse(montant));
        });
        hardware.RegisterSugarSelectedCallback((hasSugar) => {
            this.selectionerSucre(hasSugar);
        });
        this._hardware = hardware;
    }
    insérer(pièce) {
        if (pièce.EstInférieureA(MachineACafé.PrixDuCafé))
            return;
        this._hardware.MakeACoffee();
        this.argentEncaisséEnCentimes += pièce.getMontant();
    }
    selectionerSucre(hasSugar) {
        this.hasSugar = hasSugar;
    }
}
exports.MachineACafé = MachineACafé;
MachineACafé.PrixDuCafé = Pi_ce_1.Pièce.CinquanteCentimes;
