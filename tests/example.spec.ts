import {test} from '@playwright/test';
import {DataTest} from "../src/utility/DataTest";
import {CreditCardType} from "../src/entity/data/CreditCardType";

test('has title', async ({ page }) => {
  console.log(DataTest.getCustomerInformation());
  console.log(DataTest.getDefaultAddress());
  console.log(DataTest.getRandomAddress());
  console.log(DataTest.getVariationProduct1());
  console.log(DataTest.getCard(CreditCardType.VISA))
});
