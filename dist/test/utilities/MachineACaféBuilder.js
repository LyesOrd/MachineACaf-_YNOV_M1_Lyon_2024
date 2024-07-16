"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineACaféBuilder = void 0;
const MachineACaf_Harness_1 = require("./MachineACaf\u00E9Harness");
const HardwareFake_1 = require("./HardwareFake");
class MachineACaféBuilder {
    static ParDéfaut() {
        return new MachineACaféBuilder().Build();
    }
    Build() {
        let hardware = new HardwareFake_1.HardwareFake();
        return new MachineACaf_Harness_1.MachineACaféHarness(hardware);
    }
}
exports.MachineACaféBuilder = MachineACaféBuilder;
