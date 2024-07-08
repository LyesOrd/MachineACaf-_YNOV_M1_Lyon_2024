<<<<<<< HEAD
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
=======
import {HardwareInterface} from "../../src/hardware/hardware.interface";
import {Pièce} from "../../src/Pièce";
import {HardwareDummy} from "./HardwareDummy";

export interface HardwareFakeInterface extends HardwareInterface {
    SimulerInsertionPièce(pièce: Pièce): void;
    CountInvocationsMakeACoffee(): number;
}

export class HardwareFake extends HardwareDummy {
    private _moneyInsertedCallback: (coinValue: number) => void = () => {};
    private _invocationsMakeACoffee: number = 0;
>>>>>>> 6d76a8b296d9701355faace3feb11642058b00a6

  RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
    this._moneyInsertedCallback = callback;
  }

  RegisterSugarSelectedCallback(callback: (hasSugar: boolean) => void): void {
    this._sugarSelectedCallback = callback;
  }

  public SimulerInsertionPièce(pièce: Pièce): void {
    this._moneyInsertedCallback(pièce.getMontant());
  }

<<<<<<< HEAD
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
=======
    public CountInvocationsMakeACoffee() : number {
        return this._invocationsMakeACoffee;
    }
}
>>>>>>> 6d76a8b296d9701355faace3feb11642058b00a6
