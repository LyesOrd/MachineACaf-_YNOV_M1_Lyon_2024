"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MachineACaf_1 = require("../src/MachineACaf\u00E9");
const Pi_ce_1 = require("../src/Pi\u00E8ce");
const HardwareFake_1 = require("./utilities/HardwareFake");
require("./utilities/HardwareMatchers");
describe("MVP", () => {
    let hardware = new HardwareFake_1.HardwareFake();
    let machineACafé = new MachineACaf_1.MachineACafé(hardware);
    beforeEach(() => {
        hardware = new HardwareFake_1.HardwareFake();
        machineACafé = new MachineACaf_1.MachineACafé(hardware);
        // jest.spyOn(machineACafé, "SimulerSelectionerSucre");
        // jest.spyOn(hardware, "MakeACoffee");
    });
    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let hardware = new HardwareFake_1.HardwareFake();
        let machineACafé = new MachineACaf_1.MachineACafé(hardware);
        // QUAND on insère 50cts, 2 fois
        hardware.SimulerInsertionPièce(Pi_ce_1.Pièce.CinquanteCentimes);
        hardware.SimulerInsertionPièce(Pi_ce_1.Pièce.CinquanteCentimes);
        // ALORS il a été demandé au hardware de servir deux cafés
        expect(hardware).xCafésSontServis(2);
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
        let hardware = new HardwareFake_1.HardwareFake();
        let machineACafé = new MachineACaf_1.MachineACafé(hardware);
        // QUAND on insère la pièce
        hardware.SimulerInsertionPièce(pièce);
        // ALORS il n'a pas été demandé au hardware de servir un café
        expect(hardware).aucunCaféNEstServi();
        // ET l'argent n'est pas encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
    });
    test.each([Pi_ce_1.Pièce.CinquanteCentimes, Pi_ce_1.Pièce.UnEuro, Pi_ce_1.Pièce.DeuxEuros])("Cas nominal : %s", (pièce) => {
        // ETANT DONNE une machine a café
        // ET une pièce d'une valeur supérieure à 50cts
        let hardware = new HardwareFake_1.HardwareFake();
        let machineACafé = new MachineACaf_1.MachineACafé(hardware);
        // QUAND on insère la pièce
        hardware.SimulerInsertionPièce(pièce);
        // ALORS il a été demandé au hardware de servir un café
        expect(hardware).unCaféEstServi();
        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    });
    test("Cas sucré", () => {
        // ETANT DONNE une machine a café
        let hardware = new HardwareFake_1.HardwareFake();
        let machineACafé = new MachineACaf_1.MachineACafé(hardware);
        // QUAND on sélectionne le sucre
        hardware.SimulerSelectionerSucre(true);
        // ALORS le sucre est sélectionné
        expect(machineACafé.hasSugar).toEqual(true);
    });
    test("ETANT DONNEE le reservoir de sucre vide, doit servir un café quand même", () => {
        // ETANT DONNE une machine a café
        let hardware = new HardwareFake_1.HardwareFake();
        let machineACafé = new MachineACaf_1.MachineACafé(hardware);
        // QUAND le reservoir de sucre est vide
        hardware.SimulerReservoirSucreVide();
        // ALORS il a été demandé au hardware de servir un café
        hardware.MakeACoffee();
        // ALORS il a été demandé au hardware de servir un café sans sucre
        expect(machineACafé.hasSugar).toBe(false);
    });
    // test("VERIFIE que le sucre est bien demandé avant de prendre un café", () => {
    //   // QUAND on insère 50cts
    //   hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes);
    //   expect(machineACafé.hasSugar).toHaveBeenCalled();
    //   expect(hardware.MakeACoffee).toHaveBeenCalled();
    //   // Vérifier l'ordre des appels
    //   const hasSugarSpy = machineACafé.hasSugar as unknown as jest.SpyInstance;
    //   const makeCoffeeSpy = hardware.MakeACoffee as unknown as jest.SpyInstance;
    //   expect(hasSugarSpy.mock.invocationCallOrder[0]).toBeLessThan(
    //     makeCoffeeSpy.mock.invocationCallOrder[0]
    //   );
    // });
    test("VERIFIE que un café est servi même si il n'y a pas de sucre", () => {
        // QUAND on insère 50cts
        hardware.SimulerInsertionPièce(Pi_ce_1.Pièce.CinquanteCentimes);
        // ALORS il a été demandé au hardware de servir un café
        // ALORS il a été demandé au hardware de servir un café sans sucre
        expect(machineACafé.hasSugar).toBe(false);
        expect(hardware).unCaféEstServi();
    });
});
