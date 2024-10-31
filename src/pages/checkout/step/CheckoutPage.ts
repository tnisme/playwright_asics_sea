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
import { step } from "@fixture/Fixture";

export default class CheckoutPage extends CheckoutLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  @step("Fill in shipping information")
  async fillInShippingInformation(address: Address, customer?: Customer) {
    const locate = test.info().project.use.locale;
    await this.setShippingFirstName(address.getFirstName());
    await this.setShippingLastName(address.getLastName());
    await this.setShippingAddress1(address.getAddress1());
    await this.setShippingPhoneNumber(address.getPhoneNumber());

    if (locate == "vi-VN") {
      await this.setShippingCity(address.getCity());
      await this.setShippingState(address.getState());
      await this.setShippingWard(address.getWard());
    } else {
      if (locate != "en-SG") {
        await this.setShippingState(address.getState());
        await this.setShippingCity(address.getCity());
      }
      await this.setShippingPostalCode(address.getZipCode());
      if (locate == "en-PH") {
        await this.setShippingBangaray(address.getBarangay());
      }
    }

    if (customer) {
      await this.setEmailAddress(customer.getEmail());
    }
  }

  @step("Submit shipping information")
  async submitShipping() {
    await this.page.click(this.submitShippingAddress);
  }

  @step("Set shipping method")
  async setShippingMethod(shippingMethod: ShippingMethod) {
    await this.page.setChecked(
      this.shippingMethod(ShippingMethodUtils.getId(shippingMethod)),
      true
    );
  }

  @step("Submit shipping method")
  async submitShippingMethod() {
    await this.page.click(this.submitShippingMethodButton);
  }

  @step("Set payment method")
  async setPaymentMethod(paymentMethod: PaymentMethod) {
    await this.page.setChecked(
      this.paymentMethod(PaymentMethodUtils.getValue(paymentMethod)),
      true
    );
  }

  @step("Place order")
  async placeOrder() {
    await this.page.click(this.placeOrderButton);
    await this.page.waitForLoadState("load");
  }

  @step("Set shipping first name")
  private async setShippingFirstName(firstName: string) {
    await this.page.fill(this.shippingFirstName, firstName);
  }

  @step("Set shipping last name")
  private async setShippingLastName(lastName: string) {
    await this.page.fill(this.shippingLastName, lastName);
  }

  @step("Set shipping address")
  private async setShippingAddress1(address: string) {
    await this.page.fill(this.shippingAddress1, address);
  }

  @step("Set shipping city")
  private async setShippingCity(city: string) {
    const locate = test.info().project.use.locale;
    if (locate == "vi-VN" || locate == "en-PH") {
      await this.page.selectOption(this.shippingCity, city);
    } else {
      await this.page.fill(this.shippingCity, city);
    }
  }

  @step("Set shipping state")
  private async setShippingState(state: string) {
    await this.page.selectOption(this.shippingState, state);
  }

  @step("Set shipping bangaray")
  private async setShippingBangaray(bangaray: string) {
    await this.page.selectOption(this.shippingBangaray, bangaray);
  }

  @step("Set shipping ward")
  private async setShippingWard(ward: string) {
    await this.page.fill(this.shippingWard, ward);
  }

  @step("Set shipping postal code")
  private async setShippingPostalCode(postalCode: string) {
    await this.page.fill(this.shippingPostalCode, postalCode);
  }

  @step("Set shipping country")
  private async setShippingCountry(country: string) {
    await this.page.selectOption(this.shippingCountry, country);
  }

  @step("Set shipping phone number")
  private async setShippingPhoneNumber(phone: string) {
    await this.page.fill(this.shippingPhoneNumber, phone);
  }

  @step("Set email address")
  private async setEmailAddress(email: string) {
    await this.page.fill(this.emailAddress, email);
  }

  @step("Is credit card method checked")
  async isCreditCardMethodChecked() {
    const isChecked = await this.page.isChecked(
      this.paymentMethod(PaymentMethodUtils.getValue(PaymentMethod.CREDIT_CARD))
    );
    await AssertUtility.assertTrue(
      isChecked,
      "Credit card method is not checked"
    );
  }

  @step("Check product")
  async checkProduct(product: Product) {
    await this.checkProductName(product);
    await this.checkProductSubtotalPrice(product);
    if (product.getProductType() === ProductType.VARIATION) {
      await this.checkProductSize(product);
      await this.checkProductColor(product);
    }
  }

  @step("Check product name")
  private async checkProductName(product: Product) {
    const actual = await this.page.innerText(
      this.productName(product.getSku())
    );
    await AssertUtility.assertEqual(actual, product.getName());
  }

  @step("Check product subtotal price")
  private async checkProductSubtotalPrice(product: Product) {
    const actual = await this.page.innerText(
      this.productSubtotalPrice(product.getSku())
    );
    await AssertUtility.assertEqual(
      actual,
      PriceUtility.convertPriceToString(
        product.getPrice() * product.getQuantity()
      )
    );
  }

  @step("Check product size")
  private async checkProductSize(product: Product) {
    const actual = await this.page.innerText(
      this.productSize(product.getSku())
    );
    //@ts-expect-error: IDE can not reference to this method
    await AssertUtility.assertEqual(actual, product.getSize());
  }

  @step("Check product color")
  private async checkProductColor(product: Product) {
    const actual = await this.page.innerText(
      this.productColor(product.getSku())
    );
    //@ts-expect-error: IDE can not reference to this method
    await AssertUtility.assertEqual(actual, product.getColor());
  }

  @step("Check shipping fee")
  async checkShippingFee(fee: number) {
    const shippingFee = await this.page.innerText(this.shippingFee);
    const shippingFeeExpected =
      fee > 0
        ? PriceUtility.convertPriceToString(fee)
        : this.getShippingFeeText();
    await AssertUtility.assertEqual(shippingFee, shippingFeeExpected);
  }

  private getShippingFeeText(): string {
    switch (test.info().project.use.locale) {
      case "th-TH":
        return "ฟรี";
      case "vi-VN":
        return "Miễn phí";
      default:
        return "Free";
    }
  }

  @step("Check subtotal price")
  async checkSubtotalPrice(price: number) {
    const subtotalPrice = await this.page.innerText(this.subtotal);
    await AssertUtility.assertEqual(
      subtotalPrice,
      PriceUtility.convertPriceToString(price)
    );
  }

  @step("Check grand total price")
  async checkGrandTotalPrice(price: number) {
    const totalPrice = await this.page.innerText(this.grandTotal);
    await AssertUtility.assertEqual(
      totalPrice,
      PriceUtility.convertPriceToString(price)
    );
  }
}
