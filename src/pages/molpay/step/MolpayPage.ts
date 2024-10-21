import { Page, test } from "@playwright/test";
import MolpayLocator from "../locator/MolpayLocator";
import { CreditCard } from "@entity/customer/CreditCard";

export default class MolpayPage extends MolpayLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async fillInCard(card: CreditCard) {
    await test.step(
      "Fill in card: " +
        `${card.getType()}, ${card.getNumber()}, ${card.getName()}, ${card.getMonth()}, ${card.getYear()}, ${card.getCid()}`,
      async () => {
        await this.setCardNumber(card.getNumber());
        await this.setCardCVV(card.getCid());
        await this.setCardExpiry(card);
      }
    );
  }

  private async setCardNumber(number: string) {
    await test.step("Set card number: " + number, async () => {
      await this.page.fill(this.cardNumber, number);
    });
  }

  private async setCardCVV(cid: string) {
    await test.step("Set card CVV: " + cid, async () => {
      await this.page.fill(this.cardCVV, cid);
    });
  }

  private async setCardExpiry(card: CreditCard) {
    await test.step(`Set card expiry: ${card.getMonth()}, ${card.getYear()}`, async () => {
      await this.page.selectOption(
        this.cardMonth,
        card.getMonth().replace(/^0/g, "")
      );
      await this.page.selectOption(this.cardYear, card.getYear());
    });
  }

  async selectCountry() {
    await test.step(`Select country`, async () => {
      await this.page.check(this.country);
    });
  }

  async fillBankInformation(bankName: string, description: string) {
    await test.step(`Fill bank information: ${bankName}, ${description}`, async () => {
      await this.fillInBankName(bankName);
      await this.fillInDescription(description);
    });
  }

  private async fillInBankName(bankName: string) {
    await test.step("Fill in bank name: " + bankName, async () => {
      await this.page.fill(this.bankName, bankName);
    });
  }

  private async fillInDescription(description: string) {
    await test.step("Fill in description: " + description, async () => {
      await this.page.fill(this.description, description);
    });
  }

  async agreeTerms() {
    await test.step("Agree terms", async () => {
      await this.page.check(this.terms);
    });
  }

  async payOnline() {
    await test.step("Pay online", async () => {
      await this.page.click(this.pay);
      await this.page.waitForLoadState("load");
    });
  }

  async requestOTP() {
    await test.step("Request OTP", async () => {
      await this.page.click(this.requestOTPButton);
    });
  }

  async fillInOTP() {
    const otp = (await this.page.locator(this.otp).innerText()).replace(
      "OTP/TAC: ",
      ""
    );
    await test.step("Fill in OTP: " + otp, async () => {
      await this.page.fill(this.otpInput, otp);
    });
  }

  async payNow() {
    await test.step("Pay now", async () => {
      await this.page.click(this.payNowButton);
      await this.page.waitForLoadState("load");
    });
  }
}
