"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardware_interface_1 = require("../src/hardware/hardware.interface");
const Pi_ce_1 = require("../src/Pi\u00E8ce");
require("./utilities/HardwareMatchers");
const MachineACaf_Builder_1 = require("./utilities/MachineACaf\u00E9Builder");
describe("MVP", () => {
    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaf_Builder_1.MachineACaféBuilder.ParDéfaut();
        // QUAND on insère 50cts, 2 fois
        machineACafé.SimulerInsertionPièce(Pi_ce_1.Pièce.CinquanteCentimes);
        machineACafé.SimulerInsertionPièce(Pi_ce_1.Pièce.CinquanteCentimes);
        // ALORS il a été demandé au machineACafé de servir deux cafés
        expect(machineACafé).xCafésSontServis(2);
        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(100);
    });
    test.each([
        Pi_ce_1.Pièce.UnCentime,
        Pi_ce_1.Pièce.DeuxCentimes,
        Pi_ce_1.Pièce.CinqCentimes,
        Pi_ce_1.Pièce.DixCentimes,
        Pi_ce_1.Pièce.VingtCentimes,
    ])("Cas pas assez argent : %s", (pièce) => {
        // ETANT DONNE une machine a café
        // ET une pièce d'une valeur inférieure 50cts
        let machineACafé = MachineACaf_Builder_1.MachineACaféBuilder.ParDéfaut();
        // QUAND on insère la pièce
        machineACafé.SimulerInsertionPièce(pièce);
        // ALORS il n'a pas été demandé au machineACafé de servir un café
        expect(machineACafé).aucunCaféNEstServi();
        // ET l'argent n'est pas encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
    });
    test.each([Pi_ce_1.Pièce.CinquanteCentimes, Pi_ce_1.Pièce.UnEuro, Pi_ce_1.Pièce.DeuxEuros])("Cas nominal : %s", (pièce) => {
        // ETANT DONNE une machine a café
        // ET une pièce d'une valeur supérieure à 50cts
        let machineACafé = MachineACaf_Builder_1.MachineACaféBuilder.ParDéfaut();
        // QUAND on insère la pièce
        machineACafé.SimulerInsertionPièce(pièce);
        // ALORS il a été demandé au machineACafé de servir un café
        expect(machineACafé).unCaféEstServi();
        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    });
    test("ETANT DONNEE une machine à café QUAND le réservoir de sucre est vide ALORS servir un café quand même", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaf_Builder_1.MachineACaféBuilder.ParDéfaut();
        // ET le reservoir de sucre est vide
        machineACafé.SimulerReservoirVide();
        // QUAND on insère 50cts
        machineACafé.SimulerInsertionPièce(Pi_ce_1.Pièce.CinquanteCentimes);
        // ALORS il a été demandé au hardware de servir un café
        expect(machineACafé).unCaféEstServi();
    });
    test("ETANT DONNEE le reservoir de sucre vide, doit servir un café quand même", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaf_Builder_1.MachineACaféBuilder.ParDéfaut();
        // ET le reservoir de sucre est vide
        // machineACafé.reservoirSucreVide = true;
        // QUAND on insère 50cts
        machineACafé.SimulerInsertionPièce(Pi_ce_1.Pièce.CinquanteCentimes);
        // ALORS il a été demandé au hardware de servir un café
        expect(machineACafé).unCaféEstServi();
    });
    // ETANT DONNEE UNE MACHINE A CAFE QUAND J'APPUIE SUR UN BOUTON ALORS un café coule
    test("ETANT DONNEE UNE MACHINE A CAFE QUAND J'APPUIE SUR UN BOUTON ALORS un café coule", () => {
        let machineACafé = MachineACaf_Builder_1.MachineACaféBuilder.ParDéfaut();
        //QUAND
        machineACafé.SimulerAppuieSurunBouton(hardware_interface_1.ButtonCodes.BTN_LUNGO);
        //ALORS
        expect(machineACafé).unCaféEstServi();
    });
});
