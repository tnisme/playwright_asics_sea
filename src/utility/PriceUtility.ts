import { DataTest } from "@utility/DataTest";
import { test } from "@fixture/Fixture";

export default class PriceUtility {
  static convertPriceToString(value: number): string {
    const locale = test.info().project.use.locale;
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

  static convertStringToPrice(value: string): number {
    return Number.parseFloat(value.replace(/[^0-9.]+/g, ""));
  }
}
