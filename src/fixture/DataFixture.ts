import { test as base } from "@playwright/test";
import fs from "fs";
import path from "path";
import { Customer, CustomerBuilder } from "@entity/customer/Customer";
import { Address, AddressBuilder } from "@entity/customer/Address";
import {
  VariationProduct,
  VariationProductBuilder,
} from "@entity/product/VariationProduct";
import { CreditCard, CreditCardBuilder } from "@entity/customer/CreditCard";
import { CreditCardType } from "@entity/data/CreditCardType";
import {
  ShippingMethod,
  ShippingMethodUtils,
} from "@entity/data/ShippingMethod";
import { Product } from "@entity/product/Product";
import { PaymentMethod } from "@entity/data/PaymentMethod";
import { faker } from "@faker-js/faker/locale/en"; //https://www.npmjs.com/package/@faker-js/faker

const customerJSON = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "account.json"), "utf8")
);
const variationProductJSON = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "product.json"), "utf8")
);
const cardJSON = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "card.json"), "utf8")
);

type fixtureData = {
  customerInformation: Customer;
  randomCustomerInformation: Customer;
  defaultAddress: Address;
  randomAddress: Address;
  variantProduct1: VariationProduct;
  visaCard: CreditCard;
  shippingMethodStandard: ShippingMethod;
  shippingMethodNextDay: ShippingMethod;
  paymentMethodCreditCard: PaymentMethod;
  calculated: (
    shippingMethod: ShippingMethod,
    ...products: Product[]
  ) => { subTotal: number; shippingFee: number; grandTotal: number };
  currency: string;
};

export const test = base.extend<fixtureData>({
  customerInformation: async ({}, use) => {
    const customer =
      customerJSON[process.env.ENVIRONMENT][test.info().project.use.locale]
        .customer1;
    await use(
      CustomerBuilder.setFirstName(customer.firstname)
        .setLastName(customer.lastname)
        .setEmail(customer.email)
        .setPassword(customer.password)
        .setGender(customer.gender)
        .setBirthDay(customer.birthday)
        .build()
    );
  },

  randomCustomerInformation: async ({}, use) => {
    const customer =
      customerJSON[process.env.ENVIRONMENT][test.info().project.use.locale]
        .customer1;
    await use(
      CustomerBuilder.setFirstName(faker.person.firstName())
        .setLastName(faker.person.lastName())
        .setEmail(faker.internet.email())
        .setPassword(faker.internet.password())
        .setGender(customer.gender)
        .setBirthDay(customer.birthday)
        .build()
    );
  },

  defaultAddress: async ({}, use) => {
    const defaultAddress =
      customerJSON[process.env.ENVIRONMENT][test.info().project.use.locale]
        .customer1.default;
    await use(
      AddressBuilder.setTitle(defaultAddress.title)
        .setFirstName(defaultAddress.firstname)
        .setLastName(defaultAddress.lastname)
        .setZipCode(defaultAddress.zipcode)
        .setAddress1(defaultAddress.address1)
        .setAddress2(defaultAddress.address2)
        .setCity(defaultAddress.city)
        .setState(defaultAddress.state)
        .setPhoneNumber(defaultAddress.phonenumber)
        .setCountry(defaultAddress.country)
        .build()
    );
  },

  randomAddress: async ({}, use) => {
    const defaultAddress =
      customerJSON[process.env.ENVIRONMENT][test.info().project.use.locale]
        .customer1.default;
    await use(
      AddressBuilder.setTitle(defaultAddress.title)
        .setFirstName(faker.person.firstName())
        .setLastName(faker.person.lastName())
        .setZipCode(defaultAddress.zipcode)
        .setAddress1(defaultAddress.address1)
        .setAddress2(defaultAddress.address2)
        .setCity(defaultAddress.city)
        .setState(defaultAddress.state)
        .setPhoneNumber(defaultAddress.phonenumber)
        .setCountry(defaultAddress.country)
        .build()
    );
  },

  variantProduct1: async ({}, use) => {
    const product =
      variationProductJSON[process.env.ENVIRONMENT][
        test.info().project.use.locale
      ].vp1;
    await use(
      VariationProductBuilder.setName(product.name)
        .setSku(product.sku)
        .setPrice(product.price)
        .setCategory(product.category)
        .setUrl(product.url)
        // @ts-expect-error: IDE can not reference to this method
        .setSize(product.size)
        .setColor(product.color)
        .setWidth(product.width)
        .setQuantity(product.qty)
        .setErpProductId(product.erpProductId)
        .setWarehouseId(product.warehouseId)
        .build()
    );
  },

  shippingMethodStandard: async ({}, use) => {
    await use(ShippingMethod.STANDARD);
  },

  shippingMethodNextDay: async ({}, use) => {
    await use(ShippingMethod.NEXT_DAY);
  },

  paymentMethodCreditCard: async ({}, use) => {
    await use(PaymentMethod.CREDIT_CARD);
  },

  visaCard: async ({}, use) => {
    const card = cardJSON[test.info().project.use.locale][CreditCardType.VISA];
    await use(
      CreditCardBuilder.setName(card.name)
        .setNumber(card.number)
        .setMonth(card.month)
        .setYear(card.year)
        .setCid(card.cid)
        .setType(CreditCardType.VISA)
        .build()
    );
  },

  calculated: async ({}, use) => {
    await use((shippingMethod: ShippingMethod, ...products: Product[]) => {
      let subTotal = 0;
      products.forEach((product) => {
        subTotal += product.getPrice() * product.getQuantity();
      });
      const shippingFee = ShippingMethodUtils.getFee(shippingMethod, subTotal);
      const grandTotal = subTotal + shippingFee;

      return { subTotal, shippingFee, grandTotal };
    });
  },

  currency: async ({}, use) => {
    const currencyMap: { [key: string]: string } = {
      "en-SG": "SGD", // Singapore Dollar
      "en-MY": "MYR", // Malaysian Ringgit
      "en-PH": "PHP", // Philippine Peso
      "th-TH": "THB", // Thai Baht
      "vi-VN": "VND", // Vietnamese Dong
    };
    await use(currencyMap[test.info().project.use.locale] || "SGD");
  },
});
