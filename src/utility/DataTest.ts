import { Customer, CustomerBuilder } from "@entity/customer/Customer";
import { Address, AddressBuilder } from "@entity/customer/Address";
import {
  VariationProduct,
  VariationProductBuilder,
} from "@entity/product/VariationProduct";
import { CreditCard, CreditCardBuilder } from "@entity/customer/CreditCard";
import { CreditCardType } from "@entity/data/CreditCardType";

import * as fs from "fs";
import * as path from "path";
import { faker } from "@faker-js/faker/locale/en"; //https://www.npmjs.com/package/@faker-js/faker

const customerData = fs.readFileSync(
  path.join(__dirname, "..", "data", "account.json"),
  "utf8",
);
const productData = fs.readFileSync(
  path.join(__dirname, "..", "data", "product.json"),
  "utf8",
);
const cardData = fs.readFileSync(
  path.join(__dirname, "..", "data", "card.json"),
  "utf8",
);
// const productData = fs.readFileSync('src/data/product.json', 'utf8'); TODO why can not find file if using this?
const customerJSON = JSON.parse(customerData);
const variationProductJSON = JSON.parse(productData);
const cardJSON = JSON.parse(cardData);

export class DataTest {
  static getCustomerInformation(): Customer {
    const customer =
      customerJSON[process.env.ENVIRONMENT][process.env.LOCATE].customer1;
    return CustomerBuilder.setFirstName(customer.firstname)
      .setLastName(customer.lastname)
      .setEmail(customer.email)
      .setPassword(customer.password)
      .setGender(customer.gender)
      .setBirthDay(customer.birthday)
      .build();
  }

  static getDefaultAddress(): Address {
    const defaultAddress =
      customerJSON[process.env.ENVIRONMENT][process.env.LOCATE].customer1
        .default;
    return AddressBuilder.setTitle(defaultAddress.title)
      .setFirstName(defaultAddress.firstname)
      .setLastName(defaultAddress.lastname)
      .setZipCode(defaultAddress.zipcode)
      .setAddress1(defaultAddress.address1)
      .setAddress2(defaultAddress.address2)
      .setCity(defaultAddress.city)
      .setState(defaultAddress.state)
      .setPhoneNumber(defaultAddress.phonenumber)
      .setCountry(defaultAddress.country)
      .build();
  }

  static getRandomAddress(): Address {
    const defaultAddress =
      customerJSON[process.env.ENVIRONMENT][process.env.LOCATE].customer1
        .default;
    return AddressBuilder.setTitle(defaultAddress.title)
      .setFirstName(faker.person.firstName())
      .setLastName(faker.person.lastName())
      .setZipCode(defaultAddress.zipcode)
      .setAddress1(defaultAddress.address1)
      .setAddress2(defaultAddress.address2)
      .setCity(defaultAddress.city)
      .setState(defaultAddress.state)
      .setPhoneNumber(defaultAddress.phonenumber)
      .setCountry(defaultAddress.country)
      .build();
  }

  static getVariationProduct1(): VariationProduct {
    const product =
      variationProductJSON[process.env.ENVIRONMENT][process.env.LOCATE].vp1;
    return (
      VariationProductBuilder.setName(product.name)
        .setSku(product.sku)
        .setPrice(product.price)
        .setCategory(product.category)
        .setUrl(product.url)
        // @ts-expect-error: IDE can not reference to this method
        .setSize(product.size)
        .setColor(product.color)
        .setWidth(product.width)
        .setQuantity(product.quantity)
        .setErpProductId(product.erpProductId)
        .setWarehouseId(product.warehouseId)
        .build()
    );
  }

  static getVariationProduct2(): VariationProduct {
    const product =
      variationProductJSON[process.env.ENVIRONMENT][process.env.LOCATE].vp2;
    return (
      VariationProductBuilder.setName(product.name)
        .setSku(product.sku)
        .setPrice(product.price)
        .setCategory(product.category)
        .setUrl(product.url)
        // @ts-expect-error: IDE can not reference to this method
        .setSize(product.size)
        .setColor(product.color)
        .setWidth(product.width)
        .setQuantity(product.quantity)
        .setErpProductId(product.erpProductId)
        .setWarehouseId(product.warehouseId)
        .build()
    );
  }

  static getCard(creditCardType: CreditCardType): CreditCard {
    const card = cardJSON[process.env.LOCATE][creditCardType];
    return CreditCardBuilder.setName(card.name)
      .setNumber(card.number)
      .setMonth(card.month)
      .setYear(card.year)
      .setCid(card.cid)
      .setType(creditCardType)
      .build();
  }
}
