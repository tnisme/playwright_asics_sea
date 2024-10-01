import {test} from '@playwright/test';
import HomePage from "../../src/pages/utility/method/HomePage";
import LoginPage from "../../src/pages/utility/method/LoginPage";
import {Customer} from "../../src/entity/customer/Customer";
import {Address} from "../../src/entity/customer/Address";
import {DataTest} from "../../src/utility/DataTest";
import {VariationProduct} from "../../src/entity/product/VariationProduct";
import NavigateUtility from "../../src/utility/NavigateUtility";
import ProductListPage from "../../src/pages/product/method/ProductListPage";
import ProductDetailPage from "../../src/pages/product/method/ProductDetailPage";
import ShoppingCartPage from "../../src/pages/cart/method/ShoppingCartPage";
import CheckoutPage from "../../src/pages/checkout/method/CheckoutPage";
import {ShippingMethod, ShippingMethodUtils} from "../../src/entity/data/ShippingMethod";
import {PaymentMethod} from "../../src/entity/data/PaymentMethod";
import WorldPayPage from "../../src/pages/worldPay/method/WorldPayPage";
import {CreditCard} from "../../src/entity/customer/CreditCard";
import {CreditCardType} from "../../src/entity/data/CreditCardType";
import ThankYouPage from "../../src/pages/checkout/method/ThankYouPage";

let homePage: HomePage, customer: Customer, product: VariationProduct, address: Address,
    productListPage: ProductListPage,
    productDetailPage: ProductDetailPage, shoppingCartPage: ShoppingCartPage, checkoutPage: CheckoutPage,
    shippingMethod: ShippingMethod, paymentMethod: PaymentMethod, worldPayPage: WorldPayPage, card: CreditCard,
    thankYouPage: ThankYouPage, orderNumber: string, discount: number, subTotal: number, shippingFee: number,
    grandTotal: number;

test.beforeAll('init', async () => {
    customer = DataTest.getCustomerInformation();
    product = DataTest.getVariationProduct1();
    address = DataTest.getRandomAddress();
    shippingMethod = ShippingMethod.STANDARD;
    paymentMethod = PaymentMethod.CREDIT_CARD;
    card = DataTest.getCard(CreditCardType.VISA);
})

test('Guest_CheckoutVisaCard_StandardDeliveryTestSpec', async ({page}) => {

    await test.step('Add product to cart', async () => {
        homePage = await NavigateUtility.navigateToHomePage(page);
        await homePage.isGuest();// only for showing how to extends locator class
        productListPage = await homePage.search(product.getName());
        productDetailPage = await productListPage.viewProductDetail(product);
        await productDetailPage.addToCart(product);
    })

    await test.step('Checkout', async () => {
        shoppingCartPage = await homePage.viewCart();
        await calculate();
        checkoutPage = await shoppingCartPage.checkout();

        await checkoutPage.fillInShippingInformation(address, customer);
        await checkoutPage.submitShipping();
        await checkoutPage.setShippingMethod(shippingMethod);
        await checkoutPage.submitShippingMethod();
        await checkoutPage.setPaymentMethod(paymentMethod);
        worldPayPage = await checkoutPage.placeOrder(paymentMethod);

        await worldPayPage.fillInCard(card);
        thankYouPage = await worldPayPage.makePayment();
        orderNumber = await thankYouPage.getOrderNumber();
    })
})

async function calculate() {
    if (await shoppingCartPage.isHasDiscountOrder()) discount = await shoppingCartPage.getDiscountOrderAmount();
    subTotal = product.getPrice() * product.getQuantity();
    shippingFee = ShippingMethodUtils.getFee(shippingMethod, subTotal);
    grandTotal = subTotal + shippingFee - discount;
}
