import { Pièce } from "./Pièce";
import { HardwareInterface } from "./hardware/hardware.interface";

export class MachineACafé {
  private readonly _hardware: HardwareInterface;

  argentEncaisséEnCentimes: number = 0;
  hasSugar: boolean = false;

  constructor(hardware: HardwareInterface) {
    hardware.RegisterMoneyInsertedCallback((montant: number) => {
      this.insérer(Pièce.Parse(montant));
    });

    hardware.RegisterSugarSelectedCallback((hasSugar) => {
      this.selectionerSucre(hasSugar);
    });

    this._hardware = hardware;
  }

  private static readonly PrixDuCafé = Pièce.CinquanteCentimes;

  private insérer(pièce: Pièce) {
    if (pièce.EstInférieureA(MachineACafé.PrixDuCafé)) return;
    this._hardware.MakeACoffee();
    this.argentEncaisséEnCentimes += pièce.getMontant();
  }

  public selectionerSucre(hasSugar: boolean) {
    this.hasSugar = hasSugar;
  }
}
