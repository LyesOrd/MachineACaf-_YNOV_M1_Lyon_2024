"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const MachineACaf_Harness_1 = require("./MachineACaf\u00E9Harness");
const aucunCaféNEstServi = function (actual) {
    if (!(actual instanceof MachineACaf_Harness_1.MachineACaféHarness))
        throw new Error("Only works with MachineACaféHarness");
    const delta = actual.CountInvocationsMakeACoffee();
    const pass = delta == 0;
    const message = `${delta} cafés servis.`;
    return {
        message: () => message,
        pass: pass,
    };
};
const unCaféEstServi = function (actual) {
    if (!(actual instanceof MachineACaf_Harness_1.MachineACaféHarness))
        throw new Error("Only works with MachineACaféHarness");
    const delta = actual.CountInvocationsMakeACoffee();
    const pass = delta == 1;
    const message = `${delta} cafés servis.`;
    return {
        message: () => message,
        pass: pass,
    };
};
const xCafésSontServis = function (actual, expected) {
    if (!(actual instanceof MachineACaf_Harness_1.MachineACaféHarness))
        throw new Error("Only works with MachineACaféHarness");
    if (!Number.isInteger(expected))
        throw new Error("Only works with integer");
    const delta = actual.CountInvocationsMakeACoffee();
    const pass = delta == expected;
    const message = `${delta} cafés servis.`;
    return {
        message: () => message,
        pass: pass,
    };
};
// const unSucreEstSélectionné: MatcherFunction =
//     function (actual: unknown) {
//         if(!(actual instanceof MachineACaféHarness))
//             throw new Error("Only works with MachineACaféHarness");
//         const pass = actual.simulerSectionSucre();
//         const message = `Sucre sélectionné.`
//         return {
//             message: () => message,
//             pass: pass
//         }
//     };
globals_1.expect.extend({
    aucunCaféNEstServi,
    xCafésSontServis,
    unCaféEstServi,
    //   unSucreEstSélectionné,
});
