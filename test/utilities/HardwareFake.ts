import { HardwareInterface } from "../../src/hardware/hardware.interface";
import { Pièce } from "../../src/Pièce";

export class HardwareFake implements HardwareInterface {
  private _moneyInsertedCallback: (coinValue: number) => void = () => {};
  private _invocationsMakeACoffee: number = 0;
  private _sugarSelectedCallback: (hasSugar: boolean) => void = () => {};

  MakeACoffee(): boolean {
    this._invocationsMakeACoffee++;
    return true;
  }

  RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
    this._moneyInsertedCallback = callback;
  }

  RegisterSugarSelectedCallback(callback: (hasSugar: boolean) => void): void {
    this._sugarSelectedCallback = callback;
  }

  public SimulerInsertionPièce(pièce: Pièce): void {
    this._moneyInsertedCallback(pièce.getMontant());
  }

  SimulerSelectionerSucre(hasSugar: boolean) {
    this._sugarSelectedCallback(hasSugar);
  }

  public SimulerReservoirSucreVide() {
    this._sugarSelectedCallback(false);
  }

  public CountInvocationsMakeACoffee() {
    return this._invocationsMakeACoffee;
  }
}
