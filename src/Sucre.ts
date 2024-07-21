export class Sucre {
  static UnSucre: Sucre = new Sucre(1);
  static DeuxSucres: Sucre = new Sucre(2);
  static TroisSucres: Sucre = new Sucre(3);
  static QuatreSucres: Sucre = new Sucre(4);
  static CinqSucres: Sucre = new Sucre(5);

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

  static Parse(sugar: number) {
    switch (sugar) {
      case 1:
        return Sucre.UnSucre;
      case 2:
        return Sucre.DeuxSucres;
      case 3:
        return Sucre.TroisSucres;
      case 4:
        return Sucre.QuatreSucres;
      case 5:
        return Sucre.CinqSucres;
      default:
        throw new Error();
    }
  }

  public toString() {
    return this._amountOfSugar.toString() + "nombre de sucres";
  }
}
