import { DataTest } from "@utility/DataTest";

export default class PriceUtility {
  static convertPriceToString(price: number): string {
    return price.toLocaleString(process.env.LOCATE.replace("_", "-"), {
      style: "currency",
      currency: DataTest.getCurrency(),
    });
  }

  // static convertPriceToString(price: number): string {
  //   return new Intl.NumberFormat(process.env.LOCATE.replace("_", "-"), {
  //     style: "currency",
  //     currency: DataTest.getCurrency(),
  //   }).format(price);
  // }
}
