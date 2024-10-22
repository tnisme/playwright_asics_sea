import { test } from "@fixture/Fixture";

export default class PriceUtility {
  static convertPriceToString(value: number): string {
    const locale = test.info().project.use.locale;
    // @ts-expect-error: IDE can not reference to this parameter
    const currency = test.info().project.use.currency;
    const formattedPrice = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    })
      .format(value)
      .replace(/\u00A0/g, " ");

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
