import { Page, test } from "@playwright/test";
import ThankYouLocator from "../locator/ThankYouLocator";
import { Product } from "@entity/product/Product";
import AssertUtility from "@utility/AssertUtility";
import PriceUtility from "@utility/PriceUtility";
import { ProductType } from "@entity/data/ProductType";
import {
  ShippingMethod,
  ShippingMethodUtils,
} from "@entity/data/ShippingMethod";
import { PaymentMethod, PaymentMethodUtils } from "@entity/data/PaymentMethod";
import { Address } from "@entity/customer/Address";

export default class ThankYouPage extends ThankYouLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async getOrderNumber(): Promise<string> {
    const orderNumber = await this.page.innerText(this.orderNumber);
    return orderNumber;
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
        this.productName(product.getSku())
      );
      await AssertUtility.assertEqual(actual, product.getName());
    });
  }

  private async checkProductSubtotalPrice(product: Product) {
    await test.step(`Check product subtotal price: ${product.getName()}`, async () => {
      const actual = await this.page.innerText(
        this.productSubtotalPrice(product.getSku())
      );
      await AssertUtility.assertEqual(
        actual,
        PriceUtility.convertPriceToString(
          product.getPrice() * product.getQuantity()
        )
      );
    });
  }

  private async checkProductSize(product: Product) {
    await test.step(`Check product size: ${product.getName()}`, async () => {
      const actual = await this.page.innerText(
        this.productSize(product.getSku())
      );
      //@ts-expect-error: IDE can not reference to this method
      await AssertUtility.assertEqual(actual, product.getSize());
    });
  }

  private async checkProductColor(product: Product) {
    await test.step(`Check product color: ${product.getName()}`, async () => {
      const actual = await this.page.innerText(
        this.productColor(product.getSku())
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
    switch (test.info().project.use.locale) {
      case "th-TH":
        return "ฟรี";
      case "vi-VN":
        return "Miễn phí";
      default:
        return "Free";
    }
  }

  async checkSummarySubtotalPrice(price: number) {
    const subtotalPrice = await this.page.innerText(this.summarySubtotalPrice);
    await test.step(`Check subtotal price`, async () => {
      await AssertUtility.assertEqual(
        subtotalPrice,
        PriceUtility.convertPriceToString(price)
      );
    });
  }

  async checkSummaryGrandTotalPrice(price: number) {
    const totalPrice = await this.page.innerText(this.summaryGrandTotalPrice);
    await test.step(`Check total price`, async () => {
      await AssertUtility.assertEqual(
        totalPrice,
        PriceUtility.convertPriceToString(price)
      );
    });
  }

  async checkShippingMethod(method: ShippingMethod) {
    const shippingMethod = await this.page.innerText(this.shippingMethod);
    await test.step(`Check shipping method`, async () => {
      await AssertUtility.assertEqual(
        shippingMethod,
        "Method " + ShippingMethodUtils.getName(method)
      );
    });
  }

  async checkShippingAddress(address: Address) {
    const shippingAddress = (
      await this.page.innerText(this.shippingAddress)
    ).replace(/\n/g, "");
    const addressFormatted = this.formatAddress(address);
    await test.step(`Check shipping address`, async () => {
      await AssertUtility.assertEqual(shippingAddress, addressFormatted);
    });
  }

  async checkBillingAddress(address: Address) {
    const billingAddress = (
      await this.page.innerText(this.billingAddress)
    ).replace(/\n/g, "");
    const addressFormatted = this.formatAddress(address);
    await test.step(`Check billing address`, async () => {
      await AssertUtility.assertEqual(billingAddress, addressFormatted);
    });
  }

  async checkPaymentMethod(method: PaymentMethod) {
    const paymentMethod = await this.page.innerText(this.paymentMethod);
    await test.step(`Check payment method`, async () => {
      await AssertUtility.assertEqual(
        paymentMethod,
        PaymentMethodUtils.getName(method)
      );
    });
  }

  async checkPaymentAmount(info: number) {
    const paymentInfo = await this.page.innerText(this.paymentAmount);
    await test.step(`Check payment amount`, async () => {
      await AssertUtility.assertEqual(
        paymentInfo,
        PriceUtility.convertPriceToString(info)
      );
    });
  }

  private formatAddress(address: Address) {
    switch (test.info().project.use.locale) {
      case "en-SG":
        return this.formatAddressSG(address);
      case "en-MY":
        return this.formatAddressMY(address);
      case "vi-VN":
        return this.formatAddressVN(address);
      default:
        return "invalid";
    }
  }

  private formatAddressSG(address: Address) {
    return (
      address.getFirstName() +
      " " +
      address.getLastName() +
      address.getAddress1() +
      address.getAddress2() +
      address.getCity() +
      ", " +
      address.getZipCode() +
      address.getCountry()
    );
  }

  private formatAddressMY(address: Address) {
    return (
      address.getFirstName() +
      " " +
      address.getLastName() +
      address.getAddress1() +
      address.getAddress2() +
      address.getCity() +
      ", " +
      address.getState() +
      " " +
      address.getZipCode() +
      address.getCountry()
    );
  }

  private formatAddressVN(address: Address) {
    return (
      address.getFirstName() +
      " " +
      address.getLastName() +
      address.getAddress1() +
      address.getAddress2() +
      address.getWard() +
      ", " +
      address.getState() +
      ", " +
      address.getCity() +
      address.getCountry()
    );
  }
}
