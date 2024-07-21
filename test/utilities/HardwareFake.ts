import {
  ButtonCodes,
  HardwareInterface,
} from "../../src/hardware/hardware.interface";
import { Pièce } from "../../src/Pièce";
import { HardwareDummy } from "./HardwareDummy";

export interface HardwareFakeInterface extends HardwareInterface {
  SimulerAppuieSurunBouton(buttonCode: ButtonCodes): void;
  SimulerInsertionPièce(pièce: Pièce): void;
  CountInvocationsMakeACoffee(): number;
  CountNumberOfSugarSelected(): number;
}

export class HardwareFake extends HardwareDummy {
  private _moneyInsertedCallback: (coinValue: number) => void = () => {};
  private _invocationsMakeACoffee: number = 0;
  private _numberOfSugarSelected: number = 2;
  private _sugarSelectedCallback: (sugar: number) => void = () => {};
  private _buttonPressedCallback: (buttonCode: ButtonCodes) => void = () => {};

  public RegisterButtonPressedCallback(
    callback: (buttonCode: ButtonCodes) => void
  ): void {
    this._buttonPressedCallback = callback;
  }

  MakeACoffee(): boolean {
    this._invocationsMakeACoffee++;
    return true;
  }

  PourSugar(): boolean {
    this._numberOfSugarSelected++;
    return true;
  }

  RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
    this._moneyInsertedCallback = callback;
  }

  RegisterSugarSelectedCallback(callback: (sugar: number) => void): void {
    this._sugarSelectedCallback = callback;
  }

  public SimulerInsertionPièce(pièce: Pièce): void {
    this._moneyInsertedCallback(pièce.getMontant());
  }

  public SimulerAppuieSurunBouton(buttonCode: number) {
    this._buttonPressedCallback(buttonCode);
  }

  public CountNumberOfSugarSelected() {
    return this._numberOfSugarSelected;
  }

  public CountInvocationsMakeACoffee() {
    return this._invocationsMakeACoffee;
  }
}
