import {Page} from "@playwright/test";
import CheckoutLocator from "../locator/CheckoutLocator";
import {Address} from "../../../entity/customer/Address";
import {Customer} from "../../../entity/customer/Customer";
import {ShippingMethod, ShippingMethodUtils} from "../../../entity/data/ShippingMethod";
import {PaymentMethod, PaymentMethodUtils} from "../../../entity/data/PaymentMethod";
import WorldPayPage from "../../worldPay/method/WorldPayPage";

export default class CheckoutPage {

    constructor(private page: Page) {
    }

    async fillInShippingInformation(address: Address, customer?: Customer) {
        await this.setShippingFirstName(address.getFirstName());
        await this.setShippingLastName(address.getLastName());
        await this.setShippingAddress1(address.getAddress1());
        await this.setShippingPhoneNumber(address.getPhoneNumber());

        if (process.env.LOCATE == 'vi_VN') {
            await this.setShippingCity(address.getCity());
            await this.setShippingState(address.getState());
            await this.setShippingWard(address.getWard());
        } else {
            if (process.env.LOCATE != 'en_SG') {
                await this.setShippingState(address.getState());
                await this.setShippingCity(address.getCity());
            }
            await this.setShippingPostalCode(address.getZipCode());
            if (process.env.LOCATE == 'en_PH') {
                await this.setShippingBangaray(address.getBarangay());
            }
        }

        if (customer) {
            await this.setEmailAddress(customer.getEmail());
        }
    }

    async submitShipping() {
        await this.page.click(CheckoutLocator.submitShippingAddress);
    }

    async setShippingMethod(shippingMethod: ShippingMethod) {
        await this.page.setChecked(CheckoutLocator.shippingMethod(ShippingMethodUtils.getId(shippingMethod)), true);
    }

    async submitShippingMethod() {
        await this.page.click(CheckoutLocator.submitShippingMethod);
    }

    async setPaymentMethod(paymentMethod: PaymentMethod) {
        await this.page.setChecked(CheckoutLocator.paymentMethod(PaymentMethodUtils.getValue(paymentMethod)), true);
    }

    async placeOrder(paymentMethod: PaymentMethod): Promise<any> {
        await this.page.click(CheckoutLocator.placeOrder);
        await this.page.waitForLoadState('load');
        switch (paymentMethod) {
            case PaymentMethod.CREDIT_CARD: {
                if (process.env.LOCATE == 'en_SG') return new WorldPayPage(this.page);
            }
        }
    }

    private async setShippingFirstName(firstName: string) {
        await this.page.fill(CheckoutLocator.shippingFirstName, firstName);
    }

    private async setShippingLastName(lastName: string) {
        await this.page.fill(CheckoutLocator.shippingLastName, lastName);
    }

    private async setShippingAddress1(address: string) {
        await this.page.fill(CheckoutLocator.shippingAddress1, address);
    }

    private async setShippingCity(city: string) {
        if (process.env.LOCATE == 'vi_VN' || process.env.LOCATE == 'en_PH') {
            await this.page.selectOption(CheckoutLocator.shippingCity, city);
        } else {
            await this.page.fill(CheckoutLocator.shippingCity, city);
        }
    }

    private async setShippingState(state: string) {
        await this.page.selectOption(CheckoutLocator.shippingState, state);
    }

    private async setShippingBangaray(bangaray: string) {
        await this.page.selectOption(CheckoutLocator.shippingBangaray, bangaray);
    }

    private async setShippingWard(ward: string) {
        await this.page.fill(CheckoutLocator.shippingWard, ward);
    }

    private async setShippingPostalCode(postalCode: string) {
        await this.page.fill(CheckoutLocator.shippingPostalCode, postalCode);
    }

    private async setShippingCountry(country: string) {
        await this.page.selectOption(CheckoutLocator.shippingCountry, country);
    }

    private async setShippingPhoneNumber(phone: string) {
        await this.page.fill(CheckoutLocator.shippingPhoneNumber, phone);
    }

    private async setEmailAddress(email: string) {
        await this.page.fill(CheckoutLocator.emailAddress, email);
    }
}