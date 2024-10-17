import { DataTest } from "@utility/DataTest";

export default class PriceUtility {
  static convertPriceToString(value: number): string {
    const locale = process.env.LOCATE.replace("_", "-");
    const currency = DataTest.getCurrency();
    const formattedPrice = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);

    // For specific cases like Singapore that require "S$" instead of "$"
    if (locale === "en-SG") {
      return formattedPrice.replace("$", "S$ ");
    }

    return formattedPrice;
  }
}
