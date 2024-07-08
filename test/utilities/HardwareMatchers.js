"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HardwareFake_1 = require("./HardwareFake");
const globals_1 = require("@jest/globals");
const aucunCaféNEstServi = function (actual) {
    if (!(actual instanceof HardwareFake_1.HardwareFake))
        throw new Error("Only works with MachineACaféHarness");
    const delta = actual.CountInvocationsMakeACoffee();
    const pass = delta == 0;
    const message = pass
        ? `Au moins un café devait être servi, aucun ne l'a été.`
        : `Aucun café ne devait être servi, ${delta} ont été servis.`;
    return {
        message: () => message,
        pass: pass
    };
};
const unCaféEstServi = function (actual) {
    if (!(actual instanceof HardwareFake_1.HardwareFake))
        throw new Error("Only works with MachineACaféHarness");
    const delta = actual.CountInvocationsMakeACoffee();
    const pass = delta == 1;
    const message = pass
        ? `Un café devait être servi, ${delta} ne l'a été.`
        : `Zéro ou plusieurs cafés devaient être servis, Un a été servi.`;
    return {
        message: () => message,
        pass: pass
    };
};
const xCafésSontServis = function (actual, expected) {
    if (!(actual instanceof HardwareFake_1.HardwareFake))
        throw new Error("Only works with HardwareFake");
    if (!Number.isInteger(expected))
        throw new Error("Only works with integer");
    const delta = actual.CountInvocationsMakeACoffee();
    const pass = delta == expected;
    const message = pass
        ? `${expected} cafés devaient être servis, ${delta} l'a été.`
        : `Il était demandé de ne pas service ${expected}, ce fut le cas.`;
    return {
        message: () => message,
        pass: pass
    };
};
globals_1.expect.extend({
    aucunCaféNEstServi,
    xCafésSontServis,
    unCaféEstServi
});
