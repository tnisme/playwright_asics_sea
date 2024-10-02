export default class HomeLocator {
    protected myAccount = ".user-info .user-account";
    protected login = ".login__buttons a[href*='?action=login']";
    protected logout: string = ".user-info .header-logout-link";
    protected register = ".login__buttons a[href*='?action=register']";
    protected miniCartCounter = 'span.mini-cart-quantity';
    protected searchLocator: string = '#q';
    protected cart = 'svg.icon.shopping-cart';
    protected viewCartButton = 'a.cart-draw__cta.button';
}
