import { MachineACaféHarness } from "./MachineACaféHarness";
import { HardwareFake, HardwareFakeInterface } from "./HardwareFake";

export class MachineACaféBuilder {
  public static ParDéfaut() {
    return new MachineACaféBuilder().Build();
  }

  public Build(): MachineACaféHarness {
    let hardware: HardwareFakeInterface = new HardwareFake();
    return new MachineACaféHarness(hardware);
  }
}
