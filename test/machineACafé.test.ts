import { MachineACafé } from "../src/MachineACafé";
import { Pièce } from "../src/Pièce";
import { HardwareFake } from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers";

describe("MVP", () => {
  let hardware = new HardwareFake();
  let machineACafé = new MachineACafé(hardware);

  beforeEach(() => {
    hardware = new HardwareFake();
    machineACafé = new MachineACafé(hardware);

    // jest.spyOn(machineACafé, "SimulerSelectionerSucre");
    // jest.spyOn(hardware, "MakeACoffee");
  });
  test("Cas 2 cafés", () => {
    // ETANT DONNE une machine a café
    let hardware = new HardwareFake();
    let machineACafé = new MachineACafé(hardware);

    // QUAND on insère 50cts, 2 fois
    hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes);
    hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes);

    // ALORS il a été demandé au hardware de servir deux cafés
    expect(hardware).xCafésSontServis(2);

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
    let hardware = new HardwareFake();
    let machineACafé = new MachineACafé(hardware);

    // QUAND on insère la pièce
    hardware.SimulerInsertionPièce(pièce);

    // ALORS il n'a pas été demandé au hardware de servir un café
    expect(hardware).aucunCaféNEstServi();

    // ET l'argent n'est pas encaissé
    expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
  });

  test.each([Pièce.CinquanteCentimes, Pièce.UnEuro, Pièce.DeuxEuros])(
    "Cas nominal : %s",
    (pièce: Pièce) => {
      // ETANT DONNE une machine a café
      // ET une pièce d'une valeur supérieure à 50cts
      let hardware = new HardwareFake();
      let machineACafé = new MachineACafé(hardware);

      // QUAND on insère la pièce
      hardware.SimulerInsertionPièce(pièce);

      // ALORS il a été demandé au hardware de servir un café
      expect(hardware).unCaféEstServi();

      // ET l'argent est encaissé
      expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    }
  );

  test("Cas sucré", () => {
    // ETANT DONNE une machine a café
    let hardware = new HardwareFake();
    let machineACafé = new MachineACafé(hardware);

    // QUAND on sélectionne le sucre
    hardware.SimulerSelectionerSucre(true);

    // ALORS le sucre est sélectionné
    expect(machineACafé.hasSugar).toEqual(true);
  });

  test("ETANT DONNEE le reservoir de sucre vide, doit servir un café quand même", () => {
    // ETANT DONNE une machine a café
    let hardware = new HardwareFake();
    let machineACafé = new MachineACafé(hardware);

    // QUAND le reservoir de sucre est vide
    hardware.SimulerReservoirSucreVide();

    // ALORS il a été demandé au hardware de servir un café
    hardware.MakeACoffee();

    // ALORS il a été demandé au hardware de servir un café sans sucre
    expect(machineACafé.hasSugar).toBe(false);
  });

  test("VERIFIE que un café est servi même si il n'y a pas de sucre", () => {
    // QUAND on insère 50cts
    hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes);

    // ALORS il a été demandé au hardware de servir un café sans sucre
    expect(machineACafé.hasSugar).toBe(false);
    expect(hardware).xCafésSontServis(1);
  });
});
