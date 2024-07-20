export class Sucre {
  private readonly _amountOfSugar: number;

  getSugarAmount(): number {
    return this._amountOfSugar;
  }

  private constructor(sugar: number) {
    this._amountOfSugar = sugar;
  }

  DonneLeMaxDeSucreDisponible() {
    return new Sucre(this.getSugarAmount());
  }

  public toString() {
    return this._amountOfSugar.toString() + "nombre de sucres";
  }
}
