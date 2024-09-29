import {test} from '@playwright/test';
import HomePage from "../../src/pages/utility/method/HomePage";
import LoginPage from "../../src/pages/utility/method/LoginPage";
import {Customer} from "../../src/entity/customer/Customer";
import {DataTest} from "../../src/utility/DataTest";
import {VariationProduct} from "../../src/entity/product/VariationProduct";
import NavigateUtility from "../../src/utility/NavigateUtility";

let homePage: HomePage;
let loginPage: LoginPage;
let customer: Customer;
let product: VariationProduct;

export default function Guest_CheckoutVisaCard_StandardDeliveryTest() {
    test.beforeAll('init', async () => {
        customer = DataTest.getCustomerInformation();
        product = DataTest.getVariationProduct1();
    })

    test('Guest_CheckoutVisaCard_StandardDeliveryTest', async ({page}) => {

        await test.step('Login', async () => {
            homePage = await NavigateUtility.navigateToHomePage(page);
            homePage = await NavigateUtility.navigateToHomePage(page);
            loginPage = await homePage.goToLoginPage();
            await loginPage.login(customer);
        })

        await test.step('Add product to cart', async () => {
            await homePage.search(product.getName());
        })

        await test.step('Checkout', async () => {

        })

    })
}
