import { test } from "@playwright/test";

export enum PaymentMethod {
  CREDIT_CARD,
  ATOME,
  E_WALLET,
  ONLINE_BANKING,
  CASH_ON_DELIVERY,
  QR_PAYMENT,
}

export class PaymentMethodUtils {
  static getValue(paymentMethod: PaymentMethod): string {
    const locate = test.info().project.use.locale;
    switch (paymentMethod) {
      case PaymentMethod.CREDIT_CARD:
        if (locate == "en-SG") return "Worldpay";
        if (locate == "en-MY") return "M_CREDIT";
        if (locate == "en-PH") return "CreditCard";
        if (locate == "th-TH") return "CC";
        if (locate == "vi-VN") return "O_CREDIT";
        else return "invalid";
      default:
        return "invalid";
    }
  }

  static getName(paymentMethod: PaymentMethod): string {
    switch (paymentMethod) {
      case PaymentMethod.CREDIT_CARD:
        return this.getPaymentMethodCreditCardName();
      default:
        return "invalid";
    }
  }

  static getPaymentMethodCreditCardName(): string {
    switch (test.info().project.use.locale) {
      case "en-SG":
        return "VISA & MASTERCARD";
      case "en-MY":
        return "Molpay";
      case "en-PH":
        return "Credit card/Debit Card";
      case "th-TH":
        return "บัตรเครดิต";
      case "vi-VN":
        return "Onepay";
      default:
        return "invalid";
    }
  }
}
