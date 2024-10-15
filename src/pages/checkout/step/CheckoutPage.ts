import { Page, test } from "@playwright/test";
import CheckoutLocator from "../locator/CheckoutLocator";
import { Address } from "@entity/customer/Address";
import { Customer } from "@entity/customer/Customer";
import {
  ShippingMethod,
  ShippingMethodUtils,
} from "@entity/data/ShippingMethod";
import { PaymentMethod, PaymentMethodUtils } from "@entity/data/PaymentMethod";
import AssertUtility from "@utility/AssertUtility";
import { Product } from "@entity/product/Product";
import PriceUtility from "@utility/PriceUtility";
import { ProductType } from "@entity/data/ProductType";

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

      // eslint-disable-next-line playwright/no-conditional-in-test
      if (process.env.LOCATE == "vi_VN") {
        await this.setShippingCity(address.getCity());
        await this.setShippingState(address.getState());
        await this.setShippingWard(address.getWard());
      } else {
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (process.env.LOCATE != "en_SG") {
          await this.setShippingState(address.getState());
          await this.setShippingCity(address.getCity());
        }
        await this.setShippingPostalCode(address.getZipCode());
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (process.env.LOCATE == "en_PH") {
          await this.setShippingBangaray(address.getBarangay());
        }
      }

      // eslint-disable-next-line playwright/no-conditional-in-test
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
    await test.step(`Set payment method: ${PaymentMethodUtils.getValue(paymentMethod)}`, async () => {
      await this.page.setChecked(
        this.paymentMethod(PaymentMethodUtils.getValue(paymentMethod)),
        true,
      );
    });
  }

  async placeOrder() {
    await test.step("Place order", async () => {
      await this.page.click(this.placeOrderButton);
      await this.page.waitForLoadState("load");
    });
  }

  private async setShippingFirstName(firstName: string) {
    await test.step(`Set shipping first name: ${firstName}`, async () => {
      await this.page.fill(this.shippingFirstName, firstName);
    });
  }

  private async setShippingLastName(lastName: string) {
    await test.step(`Set shipping last name: ${lastName}`, async () => {
      await this.page.fill(this.shippingLastName, lastName);
    });
  }

  private async setShippingAddress1(address: string) {
    await test.step(`Set shipping address: ${address}`, async () => {
      await this.page.fill(this.shippingAddress1, address);
    });
  }

  private async setShippingCity(city: string) {
    if (process.env.LOCATE == "vi_VN" || process.env.LOCATE == "en_PH") {
      await test.step(`Set select option shipping city: ${city}`, async () => {
        await this.page.selectOption(this.shippingCity, city);
      });
    } else {
      await test.step(`Set field shipping city: ${city}`, async () => {
        await this.page.fill(this.shippingCity, city);
      });
    }
  }

  private async setShippingState(state: string) {
    await test.step(`Set shipping state: ${state}`, async () => {
      await this.page.selectOption(this.shippingState, state);
    });
  }

  private async setShippingBangaray(bangaray: string) {
    await test.step(`Set shipping bangaray: ${bangaray}`, async () => {
      await this.page.selectOption(this.shippingBangaray, bangaray);
    });
  }

  private async setShippingWard(ward: string) {
    await test.step(`Set shipping ward: ${ward}`, async () => {
      await this.page.fill(this.shippingWard, ward);
    });
  }

  private async setShippingPostalCode(postalCode: string) {
    await test.step(`Set shipping postal code: ${postalCode}`, async () => {
      await this.page.fill(this.shippingPostalCode, postalCode);
    });
  }

  private async setShippingCountry(country: string) {
    await test.step(`Set shipping country: ${country}`, async () => {
      await this.page.selectOption(this.shippingCountry, country);
    });
  }

  private async setShippingPhoneNumber(phone: string) {
    await test.step(`Set shipping phone number: ${phone}`, async () => {
      await this.page.fill(this.shippingPhoneNumber, phone);
    });
  }

  private async setEmailAddress(email: string) {
    await test.step(`Set email address: ${email}`, async () => {
      await this.page.fill(this.emailAddress, email);
    });
  }

  async isCreditCardMethodChecked() {
    await test.step("Is credit card method checked", async () => {
      const isChecked = await this.page.isChecked(
        this.paymentMethod(
          PaymentMethodUtils.getValue(PaymentMethod.CREDIT_CARD),
        ),
      );
      await AssertUtility.assertTrue(
        isChecked,
        "Credit card method is not checked",
      );
    });
  }

  async checkProduct(product: Product) {
    await test.step(`Check product: ${product.getName()}`, async () => {
      await this.checkProductName(product);
      await this.checkProductSubtotalPrice(product);
      // eslint-disable-next-line playwright/no-conditional-in-test
      if (product.getProductType() === ProductType.VARIATION) {
        await this.checkProductSize(product);
        await this.checkProductColor(product);
      }
    });
  }

  private async checkProductName(product: Product) {
    await test.step(`Check product name: ${product.getName()}`, async () => {
      const actual = await this.page.innerText(
        this.productName(product.getSku()),
      );
      await AssertUtility.assertEqual(actual, product.getName());
    });
  }

  private async checkProductSubtotalPrice(product: Product) {
    await test.step(`Check product subtotal price: ${product.getName()}`, async () => {
      const actual = await this.page.innerText(
        this.productSubtotalPrice(product.getSku()),
      );
      await AssertUtility.assertEqual(
        actual,
        PriceUtility.convertPriceToString(
          product.getPrice() * product.getQuantity(),
        ),
      );
    });
  }

  private async checkProductSize(product: Product) {
    await test.step(`Check product size: ${product.getName()}`, async () => {
      const actual = await this.page.innerText(
        this.productSize(product.getSku()),
      );
      //@ts-expect-error: IDE can not reference to this method
      await AssertUtility.assertEqual(actual, product.getSize());
    });
  }

  private async checkProductColor(product: Product) {
    await test.step(`Check product color: ${product.getName()}`, async () => {
      const actual = await this.page.innerText(
        this.productColor(product.getSku()),
      );
      //@ts-expect-error: IDE can not reference to this method
      await AssertUtility.assertEqual(actual, product.getColor());
    });
  }

  async checkShippingFee(fee: number) {
    const shippingFee = await this.page.innerText(this.shippingFee);
    const shippingFeeExpected =
      fee > 0
        ? PriceUtility.convertPriceToString(fee)
        : this.getShippingFeeText();
    await test.step(`Check shipping fee: ${shippingFeeExpected}`, async () => {
      await AssertUtility.assertEqual(shippingFee, shippingFeeExpected);
    });
  }

  private getShippingFeeText(): string {
    switch (process.env.LOCATE) {
      case "th_TH":
        return "ฟรี";
      case "vi_VN":
        return "Miễn phí";
      default:
        return "Free";
    }
  }

  async checkSubtotalPrice(price: number) {
    const subtotalPrice = await this.page.innerText(this.subtotal);
    await test.step(`Check subtotal price`, async () => {
      await AssertUtility.assertEqual(
        subtotalPrice,
        PriceUtility.convertPriceToString(price),
      );
    });
  }

  async checkGrandTotalPrice(price: number) {
    const totalPrice = await this.page.innerText(this.grandTotal);
    await test.step(`Check total price`, async () => {
      await AssertUtility.assertEqual(
        totalPrice,
        PriceUtility.convertPriceToString(price),
      );
    });
  }
}
