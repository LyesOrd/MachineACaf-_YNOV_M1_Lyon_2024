import { ButtonCodes } from "../src/hardware/hardware.interface";
import { MachineACafé } from "../src/MachineACafé";
import { Pièce } from "../src/Pièce";
import { Sucre } from "../src/Sucre";
import { HardwareFake } from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers";
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";
import { MachineACaféHarness } from "./utilities/MachineACaféHarness";

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

  test("cas nominal sucre : ETANT DONNEE une machine à café QUAND le réservoir de sucre est vide ALORS servir un café quand même", () => {
    // ETANT DONNE une machine a café
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // ET le reservoir de sucre est vide
    machineACafé.CountSugarSelected = jest.fn(() => 0);

    // QUAND on insère 50cts
    machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

    // ALORS il a été demandé au hardware de servir un café
    expect(machineACafé).unCaféEstServi();
  });

  test("cas sucre : ETANT DONNEE une machine à café QUAND le bouton du sucre est appuyer plusieur fois ALORS servir un café avec du sucre si le nombre de fois appuyer est impair", () => {
    // ETANT DONNE une machine a café
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // QUAND on appuie 3 fois sur le bouton du sucre
    machineACafé.SimulerAppuieSurunBouton(ButtonCodes.BTN_SUGAR_PLUS);
    machineACafé.SimulerAppuieSurunBouton(ButtonCodes.BTN_SUGAR_PLUS);
    machineACafé.SimulerAppuieSurunBouton(ButtonCodes.BTN_SUGAR_PLUS);

    // QUAND on insère 50cts
    machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

    // ALORS il a été demandé au hardware de servir un café
    expect(machineACafé).unCaféEstServi();
  });

  test("cas sucre : ETANT DONNEE une machine à café QUAND le bouton du sucre est appuyer plusieur fois ALORS servir un café sans sucre si le nombre de fois appuyer est pair", () => {
    // ETANT DONNE une machine a café
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // QUAND on appuie 2 fois sur le bouton du sucre
    machineACafé.SimulerAppuieSurunBouton(ButtonCodes.BTN_SUGAR_PLUS);
    machineACafé.SimulerAppuieSurunBouton(ButtonCodes.BTN_SUGAR_PLUS);

    // QUAND on insère 50cts
    machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

    // ALORS il a été demandé au hardware de ne pas servir de café
    expect(machineACafé).unCaféEstServi();
  });

  test("cas nominal dose de sucre : ETANT DONNEE une machine à café QUAND le bouton du sucre n'est pas appuyer ALORS servir un café avec 2 sucre", () => {
    // ETANT DONNE une machine a café
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // QUAND le bouton du sucre n'est pas selectionner
    machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes);

    // ALORS il a été demandé au hardware de servir un café
    expect(machineACafé).unCaféEstServi();
    // ET le nombre de sucre est de 2
    expect(machineACafé).xSucreOntÉtéSélectionnés(2);
  });

  test("cas dose de sucre : ETANT DONNEE une machine à café QUAND le bouton du sucre est appuyer ALORS augmenter le nombre de sucres selectionner à 3 sucres", () => {
    // ETANT DONNE une machine a café
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // QUAND le bouton du sucre est selectionner
    machineACafé.SimulerAppuieSurunBouton(ButtonCodes.BTN_SUGAR_PLUS);
    machineACafé.CountSugarSelected = jest.fn(() => 3);

    // ALORS il a été demandé au hardware le nombre de sucre à 3
    expect(machineACafé.CountSugarSelected()).toEqual(3);
  });

  test("cas dose de sucre : ETANT DONNEE une machine à café QUAND le bouton du sucre est appuyer ALORS diminuer le nombre de sucres selectionner à 1 sucre", () => {
    // ETANT DONNE une machine a café
    let machineACafé = MachineACaféBuilder.ParDéfaut();

    // QUAND le bouton du sucre est selectionner
    machineACafé.SimulerAppuieSurunBouton(ButtonCodes.BTN_SUGAR_MINUS);
    machineACafé.CountSugarSelected = jest.fn(() => 1);

    // ALORS il a été demandé au hardware le nombre de sucre à 1
    expect(machineACafé.CountSugarSelected()).toEqual(1);
  });
});
