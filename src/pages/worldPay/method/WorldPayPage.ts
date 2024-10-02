import { Page } from "@playwright/test";
import WorldPayLocator from "../locator/WorldPayLocator";
import { CreditCard } from "../../../entity/customer/CreditCard";
import ThankYouPage from "../../checkout/method/ThankYouPage";

export default class WorldPayPage extends WorldPayLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async fillInCard(card: CreditCard) {
    await this.page.fill(this.cardNumber, card.getNumber());
    await this.page.fill(this.cardCVV, card.getCid());
    await this.page.fill(this.cardExpMonth, card.getMonth());
    await this.page.fill(this.cardExpYear, card.getYear().substring(2, 4));
    await this.page.fill(this.cardName, card.getName());
  }

  async makePayment(): Promise<ThankYouPage> {
    await this.page.click(this.makePaymentButton);
    await this.page.waitForLoadState("load");
    return new ThankYouPage(this.page);
  }
}
