export default class ProductListLocator {
    protected productName = (productUrl: string) => `a.product-tile__link[href*='${productUrl}'] div.product-tile__text--underline`;
    protected productItem = (productUrl: string) => `a.product-tile__link[href*='${productUrl}'] div.product-tile__text--underline`;
    protected productItemThumbLink = (productUrl: string) => `a.product-tile__link[href*='${productUrl}'] div.product-tile__text--underline`;

    protected btnAddToCart = '#id-add-to-cart';
    protected btnQuickView = 'a.product-tile__link--active div button.quick-view-button';
    protected qickViewDialog = '#QuickViewDialog';
}