export default class CheckoutLocator {
    static readonly shippingMethod = (shippingMethodId: string) => `//input[contains(@id, 'shippingMethod-${shippingMethodId}')]`
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
    static readonly submitShipping = '//button[@value="submit-shipping"]'
}