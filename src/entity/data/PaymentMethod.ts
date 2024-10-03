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
    switch (paymentMethod) {
      case PaymentMethod.CREDIT_CARD:
        if (process.env.LOCATE == "en_SG") return "Worldpay";
        if (process.env.LOCATE == "en_MY") return "M_CREDIT";
        if (process.env.LOCATE == "en_PH") return "CreditCard";
        if (process.env.LOCATE == "th_TH") return "CC";
        if (process.env.LOCATE == "vi_VN") return "O_CREDIT";
        else return "invalid";
      default:
        return "invalid";
    }
  }
}
