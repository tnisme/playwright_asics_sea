import { Page } from "@playwright/test";
import MolpayLocator from "../locator/MolpayLocator";
import { CreditCard } from "@entity/customer/CreditCard";
import { step } from "@fixture/Fixture";

export default class MolpayPage extends MolpayLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  @step("Fill in card")
  async fillInCard(card: CreditCard) {
    await this.setCardNumber(card.getNumber());
    await this.setCardCVV(card.getCid());
    await this.setCardExpiry(card);
  }

  @step("Set card number")
  private async setCardNumber(number: string) {
    await this.page.fill(this.cardNumber, number);
  }

  @step("Set card CVV")
  private async setCardCVV(cid: string) {
    await this.page.fill(this.cardCVV, cid);
  }

  @step("Set card expiry")
  private async setCardExpiry(card: CreditCard) {
    await this.page.selectOption(
      this.cardMonth,
      card.getMonth().replace(/^0/g, "")
    );
    await this.page.selectOption(this.cardYear, card.getYear());
  }

  @step("Select country")
  async selectCountry() {
    await this.page.check(this.country);
  }

  @step("Fill bank information")
  async fillBankInformation(bankName: string, description: string) {
    await this.fillInBankName(bankName);
    await this.fillInDescription(description);
  }

  @step("Fill in bank name")
  private async fillInBankName(bankName: string) {
    await this.page.fill(this.bankName, bankName);
  }

  @step("Fill in description")
  private async fillInDescription(description: string) {
    await this.page.fill(this.description, description);
  }

  @step("Agree terms")
  async agreeTerms() {
    await this.page.check(this.terms);
  }

  @step("Pay online")
  async payOnline() {
    await this.page.click(this.pay);
    await this.page.waitForLoadState("load");
  }

  @step("Request OTP")
  async requestOTP() {
    await this.page.click(this.requestOTPButton);
  }

  @step("Fill in OTP")
  async fillInOTP() {
    const otp = (await this.page.locator(this.otp).innerText()).replace(
      "OTP/TAC: ",
      ""
    );
    await this.page.fill(this.otpInput, otp);
  }

  @step("Pay now")
  async payNow() {
    await this.page.click(this.payNowButton);
    await this.page.waitForLoadState("load");
  }
}
