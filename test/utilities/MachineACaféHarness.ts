import { MachineACafé } from "../../src/MachineACafé";
import { Pièce } from "../../src/Pièce";
import { HardwareFakeInterface } from "./HardwareFake";

export class MachineACaféHarness extends MachineACafé {
  SimulerAppuieSurunBouton(buttonCode: number) {
    return this.hardware.SimulerAppuieSurunBouton(buttonCode);
  }
  private hardware: HardwareFakeInterface;

  public constructor(hardware: HardwareFakeInterface) {
    super(hardware);
    this.hardware = hardware;
  }

  public SimulerInsertionPièce(pièce: Pièce): void {
    this.hardware.SimulerInsertionPièce(pièce);
  }

  public CountInvocationsMakeACoffee() {
    return this.hardware.CountInvocationsMakeACoffee();
  }

  public CountSugarSelected() {
    return this.hardware.CountNumberOfSugarSelected();
  }

  public SimuleSelectionDuSucre(hasSugar: boolean) {
    this.hardware.SimulerSelectionerSucre(hasSugar);
  }
}
