import {test} from '@playwright/test';
import HomePage from "../../src/pages/utility/method/HomePage";
import LoginPage from "../../src/pages/utility/method/LoginPage";
import {Customer} from "../../src/entity/customer/Customer";
import {DataTest} from "../../src/utility/DataTest";
import {VariationProduct} from "../../src/entity/product/VariationProduct";
import NavigateUtility from "../../src/utility/NavigateUtility";
import ProductListPage from "../../src/pages/product/method/ProductListPage";
import ProductDetailPage from "../../src/pages/product/method/ProductDetailPage";
import ShoppingCartPage from "../../src/pages/cart/method/ShoppingCartPage";
import CheckoutPage from "../../src/pages/checkout/method/CheckoutPage";
import {ShippingMethod} from "../../src/entity/data/ShippingMethod";

let homePage: HomePage, loginPage: LoginPage, customer: Customer, product1: VariationProduct, product2: VariationProduct,
    productListPage: ProductListPage, productDetailPage: ProductDetailPage, shoppingCartPage: ShoppingCartPage,
    checkoutPage: CheckoutPage, shippingMethod: ShippingMethod;

export default function Guest_CheckoutVisaCard_StandardDeliveryTest() {

    test.beforeAll('init', async () => {
        customer = DataTest.getCustomerInformation();
        product1 = DataTest.getVariationProduct1();
        product2 = DataTest.getVariationProduct2();
        shippingMethod = ShippingMethod.STANDARD;
    })

    test('Guest_CheckoutVisaCard_StandardDeliveryTest', async ({page}) => {

        await test.step('Login', async () => {
            homePage = await NavigateUtility.navigateToHomePage(page);
            loginPage = await homePage.goToLoginPage();
            await loginPage.login(customer);
        })

        await test.step('Add product to cart', async () => {
            productListPage = await homePage.search(product1.getName());
            productDetailPage = await productListPage.viewProductDetail(product1);
            await productDetailPage.addToCart(product1);

            productListPage = await homePage.search(product2.getName());
            productDetailPage = await productListPage.viewProductDetail(product2);
            await productDetailPage.addToCart(product2);
        })

        await test.step('Checkout', async () => {
            shoppingCartPage = await homePage.viewCart();
            checkoutPage = await shoppingCartPage.checkout();
            await checkoutPage.fillInShippingInformation(customer.getAddress());
            await checkoutPage.submitShipping();
            await checkoutPage.setShippingMethod(shippingMethod);
        })

    })
}
