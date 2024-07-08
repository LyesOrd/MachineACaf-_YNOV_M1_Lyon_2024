"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineACaféBuilder = void 0;
const MachineACaf_1 = require("../../src/MachineACaf\u00E9");
const HardwareFake_1 = require("./HardwareFake");
class MachineACaféBuilder {
    static ParDéfaut() {
        return new MachineACaféBuilder().Build();
    }
    Build() {
        return new MachineACaf_1.MachineACafé(new HardwareFake_1.HardwareFake());
    }
}
exports.MachineACaféBuilder = MachineACaféBuilder;
