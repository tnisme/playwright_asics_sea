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
    switch (process.env.LOCATE) {
      case "en_SG":
        return subTotal < 500 ? 5.9 : 0;
      case "en_MY":
        return subTotal < 400.001 ? 20 : 0;
      case "en_PH":
        return 150;
      case "th_TH":
        return subTotal < 2000 ? 200 : 0;
      case "vi_VN":
        return subTotal < 1500000 ? 40000 : 0;
      default:
        return 0;
    }
  }

  private static getFeeForNextDayShippingMethod(subTotal: number): number {
    switch (process.env.LOCATE) {
      case "vi_VN":
      case "en_SG":
        return 7.99;
      case "en_MY":
        return subTotal < 99.1 ? 7.99 : 0;
      case "en_PH":
        return subTotal < 100.01 ? 8 : 0;
      case "th_TH":
        return subTotal < 99.01 ? 7.99 : 0;
      default:
        return 0;
    }
  }

  private static getIdMethodStandard(): string {
    switch (process.env.LOCATE) {
      case "en_SG":
        return "SGD001";
      case "en_MY":
        return "MYR001";
      case "en_PH":
        return "PHP004";
      case "th_TH":
        return "THB001";
      case "vi_VN":
        return "VND001";
      default:
        return "not defined";
    }
  }

  private static getIdMethodNextDay(): string {
    switch (process.env.LOCATE) {
      case "en_SG":
        return "SGD002";
      case "en_MY":
        return "MYR003";
      case "en_PH":
        return "PHP002";
      case "th_TH":
        return "THB002";
      default:
        return "not defined";
    }
  }
}
