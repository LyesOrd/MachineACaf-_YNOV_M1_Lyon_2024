"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineACaféHarness = void 0;
const MachineACaf_1 = require("../../src/MachineACaf\u00E9");
class MachineACaféHarness extends MachineACaf_1.MachineACafé {
    SimulerAppuieSurunBouton(buttonCode) {
        return this.hardware.SimulerAppuieSurunBouton(buttonCode);
    }
    constructor(hardware) {
        super(hardware);
        this.hardware = hardware;
    }
    SimulerInsertionPièce(pièce) {
        this.hardware.SimulerInsertionPièce(pièce);
    }
    CountInvocationsMakeACoffee() {
        return this.hardware.CountInvocationsMakeACoffee();
    }
    CountSugarSelected() {
        return this.hardware.CountNumberOfSugarSelected();
    }
}
exports.MachineACaféHarness = MachineACaféHarness;
