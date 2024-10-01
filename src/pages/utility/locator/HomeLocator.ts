export default class HomeLocator {
    static readonly myAccount = ".user-info .user-account";
    static readonly login = ".login__buttons a[href*='?action=login']";
    static readonly logout = ".user-info .header-logout-link";
    static readonly register = ".login__buttons a[href*='?action=register']";
    static readonly miniCartCounter = 'span.mini-cart-quantity';
    static readonly search = '#q';
    static readonly cart = 'svg.icon.shopping-cart';
    static readonly viewCart = 'a.cart-draw__cta.button';

}