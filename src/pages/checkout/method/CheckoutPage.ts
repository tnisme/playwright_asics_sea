import { Page, test } from "@playwright/test";
import CheckoutLocator from "../locator/CheckoutLocator";
import { Address } from "@entity/customer/Address";
import { Customer } from "@entity/customer/Customer";
import {
  ShippingMethod,
  ShippingMethodUtils,
} from "@entity/data/ShippingMethod";
import {
  PaymentMethod,
  PaymentMethodUtils,
} from "@entity/data/PaymentMethod";
import WorldPayPage from "../../worldPay/method/WorldPayPage";

export default class CheckoutPage extends CheckoutLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async fillInShippingInformation(address: Address, customer?: Customer) {
    await test.step("Fill in shipping information", async () => {
      await this.setShippingFirstName(address.getFirstName());
      await this.setShippingLastName(address.getLastName());
      await this.setShippingAddress1(address.getAddress1());
      await this.setShippingPhoneNumber(address.getPhoneNumber());

      if (process.env.LOCATE == "vi_VN") {
        await this.setShippingCity(address.getCity());
        await this.setShippingState(address.getState());
        await this.setShippingWard(address.getWard());
      } else {
        if (process.env.LOCATE != "en_SG") {
          await this.setShippingState(address.getState());
          await this.setShippingCity(address.getCity());
        }
        await this.setShippingPostalCode(address.getZipCode());
        if (process.env.LOCATE == "en_PH") {
          await this.setShippingBangaray(address.getBarangay());
        }
      }

      if (customer) {
        await this.setEmailAddress(customer.getEmail());
      }
    });
  }

  async submitShipping() {
    await test.step("Submit shipping", async () => {
      await this.page.click(this.submitShippingAddress);
    });
  }

  async setShippingMethod(shippingMethod: ShippingMethod) {
    await test.step("Set shipping method", async () => {
      await this.page.setChecked(
        this.shippingMethod(ShippingMethodUtils.getId(shippingMethod)),
        true,
      );
    });
  }

  async submitShippingMethod() {
    await test.step("Submit shipping method", async () => {
      await this.page.click(this.submitShippingMethodButton);
    });
  }

  async setPaymentMethod(paymentMethod: PaymentMethod) {
    await test.step("Set payment method", async () => {
      await this.page.setChecked(
        this.paymentMethod(PaymentMethodUtils.getValue(paymentMethod)),
        true,
      );
    });
  }

  async placeOrder(paymentMethod: PaymentMethod): Promise<WorldPayPage> {
    await test.step("Place order", async () => {
      await this.page.click(this.placeOrderButton);
      await this.page.waitForLoadState("load");
    });
    switch (paymentMethod) {
      case PaymentMethod.CREDIT_CARD: {
        if (process.env.LOCATE == "en_SG") return new WorldPayPage(this.page);
      }
    }
  }

  private async setShippingFirstName(firstName: string) {
    await test.step("Set shipping first name", async () => {
      await this.page.fill(this.shippingFirstName, firstName);
    });
  }

  private async setShippingLastName(lastName: string) {
    await test.step("Set shipping last name", async () => {
      await this.page.fill(this.shippingLastName, lastName);
    });
  }

  private async setShippingAddress1(address: string) {
    await test.step("Set shipping address", async () => {
      await this.page.fill(this.shippingAddress1, address);
    });
  }

  private async setShippingCity(city: string) {
    await test.step("Set shipping city", async () => {
      if (process.env.LOCATE == "vi_VN" || process.env.LOCATE == "en_PH") {
        await this.page.selectOption(this.shippingCity, city);
      } else {
        await this.page.fill(this.shippingCity, city);
      }
    });
  }

  private async setShippingState(state: string) {
    await test.step("Set shipping state", async () => {
      await this.page.selectOption(this.shippingState, state);
    });
  }

  private async setShippingBangaray(bangaray: string) {
    await test.step("Set shipping bangaray", async () => {
      await this.page.selectOption(this.shippingBangaray, bangaray);
    });
  }

  private async setShippingWard(ward: string) {
    await test.step("Set shipping ward", async () => {
      await this.page.fill(this.shippingWard, ward);
    });
  }

  private async setShippingPostalCode(postalCode: string) {
    await test.step("Set shipping postal code", async () => {
      await this.page.fill(this.shippingPostalCode, postalCode);
    });
  }

  private async setShippingCountry(country: string) {
    await test.step("Set shipping country", async () => {
      await this.page.selectOption(this.shippingCountry, country);
    });
  }

  private async setShippingPhoneNumber(phone: string) {
    await test.step("Set shipping phone number", async () => {
      await this.page.fill(this.shippingPhoneNumber, phone);
    });
  }

  private async setEmailAddress(email: string) {
    await test.step("Set email address", async () => {
      await this.page.fill(this.emailAddress, email);
    });
  }
}
