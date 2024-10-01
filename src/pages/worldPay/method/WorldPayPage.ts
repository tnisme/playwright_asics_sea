import {Page} from "@playwright/test";
import WorldPayLocator from "../locator/WorldPayLocator";
import {CreditCard} from "../../../entity/customer/CreditCard";
import ThankYouPage from "../../checkout/method/ThankYouPage";

export default class WorldPayPage {

    constructor(private page: Page) {
    }

    async fillInCard(card: CreditCard) {
        await this.page.fill(WorldPayLocator.cardNumber, card.getNumber());
        await this.page.fill(WorldPayLocator.cardCVV, card.getCid());
        await this.page.fill(WorldPayLocator.cardExpMonth, card.getMonth());
        await this.page.fill(WorldPayLocator.cardExpYear, card.getYear().substring(2, 4));
        await this.page.fill(WorldPayLocator.cardName, card.getName());
    }

    async makePayment(): Promise<ThankYouPage> {
        await this.page.click(WorldPayLocator.makePayment);
        await this.page.waitForLoadState('load');
        return new ThankYouPage(this.page);
    }
}