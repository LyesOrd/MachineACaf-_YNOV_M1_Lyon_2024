import { ButtonCodes } from "../src/hardware/hardware.interface";
import { MachineACafé } from "../src/MachineACafé";
import { Pièce } from "../src/Pièce";
import { HardwareFake } from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers";
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";

describe("MVP", () => {
  test("Cas 2 cafés", () => {
    // ETANT DONNE une machine a café

    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // QUAND on insère 50cts, 2 fois
    machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);
    machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

    // ALORS il a été demandé au machineACafé de servir deux cafés
    expect(machineACafé).xCafésSontServis(2);

    // ET l'argent est encaissé
    expect(machineACafé.argentEncaisséEnCentimes).toEqual(100);
  });

  test.each([
    Pièce.UnCentime,
    Pièce.DeuxCentimes,
    Pièce.CinqCentimes,
    Pièce.DixCentimes,
    Pièce.VingtCentimes,
  ])("Cas pas assez argent : %s", (pièce: Pièce) => {
    // ETANT DONNE une machine a café
    // ET une pièce d'une valeur inférieure 50cts
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // QUAND on insère la pièce
    machineACafé.SimulerInsertionPièce(pièce);

    // ALORS il n'a pas été demandé au machineACafé de servir un café
    expect(machineACafé).aucunCaféNEstServi();

    // ET l'argent n'est pas encaissé
    expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
  });

  test.each([Pièce.CinquanteCentimes, Pièce.UnEuro, Pièce.DeuxEuros])(
    "Cas nominal : %s",
    (pièce: Pièce) => {
      // ETANT DONNE une machine a café
      // ET une pièce d'une valeur supérieure à 50cts
      let machineACafé = MachineACaféBuilder.ParDéfaut();

      // QUAND on insère la pièce
      machineACafé.SimulerInsertionPièce(pièce);

      // ALORS il a été demandé au machineACafé de servir un café
      expect(machineACafé).unCaféEstServi();

      // ET l'argent est encaissé
      expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    }
  );

  test("ETANT DONNEE une machine à café QUAND le réservoir de sucre est vide ALORS servir un café quand même", () => {
    // ETANT DONNE une machine a café
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // ET le reservoir de sucre est vide
    machineACafé.SimulerReservoirVide();

    // QUAND on insère 50cts
    machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

    // ALORS il a été demandé au hardware de servir un café
    expect(machineACafé).unCaféEstServi();
  });

  test("ETANT DONNEE le reservoir de sucre vide, doit servir un café quand même", () => {
    // ETANT DONNE une machine a café
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // ET le reservoir de sucre est vide
    // machineACafé.reservoirSucreVide = true;

    // QUAND on insère 50cts
    machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

    // ALORS il a été demandé au hardware de servir un café
    expect(machineACafé).unCaféEstServi();
  });

  // ETANT DONNEE UNE MACHINE A CAFE QUAND J'APPUIE SUR UN BOUTON ALORS un café coule
  test("ETANT DONNEE UNE MACHINE A CAFE QUAND J'APPUIE SUR UN BOUTON ALORS un café coule", () => {
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    //QUAND
    machineACafé.SimulerAppuieSurunBouton(ButtonCodes.BTN_LUNGO);

    //ALORS
    expect(machineACafé).unCaféEstServi();
  });
});
