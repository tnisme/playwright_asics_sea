export default class CheckoutLocator {
    static readonly shippingMethod = (shippingMethodId: string) => `//input[contains(@id, 'shippingMethod-${shippingMethodId}')]`;
    static readonly paymentMethod = (paymentMethodId: string) => `//div[@class='payment-method-options']//div[@class='field-wrapper']/input[@value='${paymentMethodId}']`;
    static readonly shippingFirstName = '#shippingFirstName';
    static readonly shippingLastName = '#shippingLastName';
    static readonly shippingAddress1 = '#shippingAddress1';
    static readonly shippingCity = '#shippingAddressCity';
    static readonly shippingState = '#shippingState';
    static readonly shippingBangaray = '#shippingAddressBarangay';
    static readonly shippingWard = '#shippingAddressWard';
    static readonly shippingPostalCode = '#shippingPostalCode';
    static readonly shippingCountry = '#shippingCountry';
    static readonly shippingPhoneNumber = '#shippingPhoneNumber';
    static readonly emailAddress = '#emailAddress';
    static readonly submitShippingAddress = '//button[@value="submit-shipping"]'
    static readonly submitShippingMethod = '//button[@value="submit-shipping-method"]'
    static readonly placeOrder = '//button[@value="place-order"]';
}