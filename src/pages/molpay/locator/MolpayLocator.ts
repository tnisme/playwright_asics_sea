export default class MolpayLocator {
  protected cardNumber = "#cardnumber";
  protected cardCVV = "#cvv";
  protected cardMonth = "#month";
  protected cardYear = "#year";
  protected bankName = "#bank_name";
  protected description = "#desc";
  protected terms = "#terms";
  protected pay = "#pay";
  protected requestOTPButton = "button.pay-btn";
  protected otp = "div.otp";
  protected otpInput = "#otp-input";
  protected country =
    "(//label[text()='Bank Country']/ancestor::div/span/input)[1]";
  protected payNowButton = "button.pay-btn";
}
