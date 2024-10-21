import { test } from "@fixture/Fixture";

export enum ShippingMethod {
  STANDARD,
  NEXT_DAY,
  CLICK_AND_COLLECT,
  WEIGHT_LOCATION,
}

export class ShippingMethodUtils {
  static getId(shippingMethod: ShippingMethod): string {
    switch (shippingMethod) {
      case ShippingMethod.STANDARD:
        return this.getIdMethodStandard();
      case ShippingMethod.NEXT_DAY:
        return this.getIdMethodNextDay();
      default:
        return "not defined";
    }
  }

  static getName(shippingMethod: ShippingMethod): string {
    switch (shippingMethod) {
      case ShippingMethod.STANDARD:
        return "Standard Delivery";
      case ShippingMethod.NEXT_DAY:
        return "Next Day Delivery";
      case ShippingMethod.CLICK_AND_COLLECT:
        return "Click and Collect";
      case ShippingMethod.WEIGHT_LOCATION:
        return "Weight Location Delivery";
      default:
        return "not defined";
    }
  }

  static getFee(shippingMethod: ShippingMethod, subTotal: number): number {
    switch (shippingMethod) {
      case ShippingMethod.STANDARD:
        return this.getFeeForStandardShippingMethod(subTotal);
      case ShippingMethod.NEXT_DAY:
        return this.getFeeForNextDayShippingMethod(subTotal);
      case ShippingMethod.CLICK_AND_COLLECT:
      default:
        return 0;
    }
  }

  private static getFeeForStandardShippingMethod(subTotal: number): number {
    switch (test.info().project.use.locale) {
      case "en-SG":
        return subTotal < 500 ? 5.9 : 0;
      case "en-MY":
        return subTotal < 400.001 ? 20 : 0;
      case "en-PH":
        return 150;
      case "th-TH":
        return subTotal < 2000 ? 200 : 0;
      case "vi-VN":
        return subTotal < 1500000 ? 40000 : 0;
      default:
        return 0;
    }
  }

  private static getFeeForNextDayShippingMethod(subTotal: number): number {
    switch (test.info().project.use.locale) {
      case "vi-VN":
      case "en-SG":
        return 7.99;
      case "en-MY":
        return subTotal < 99.1 ? 7.99 : 0;
      case "en-PH":
        return subTotal < 100.01 ? 8 : 0;
      case "th-TH":
        return subTotal < 99.01 ? 7.99 : 0;
      default:
        return 0;
    }
  }

  private static getIdMethodStandard(): string {
    switch (test.info().project.use.locale) {
      case "en-SG":
        return "SGD001";
      case "en-MY":
        return "MYR001";
      case "en-PH":
        return "PHP004";
      case "th-TH":
        return "THB001";
      case "vi-VN":
        return "VND001";
      default:
        return "not defined";
    }
  }

  private static getIdMethodNextDay(): string {
    switch (test.info().project.use.locale) {
      case "en-SG":
        return "SGD002";
      case "en-MY":
        return "MYR003";
      case "en-PH":
        return "PHP002";
      case "th-TH":
        return "THB002";
      default:
        return "not defined";
    }
  }
}
