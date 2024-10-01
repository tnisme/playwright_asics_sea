export default class ProductListLocator {
    static readonly productName = (productUrl: string) => `a.product-tile__link[href*='${productUrl}'] div.product-tile__text--underline`;
    static readonly productItem = (productUrl: string) => `a.product-tile__link[href*='${productUrl}'] div.product-tile__text--underline`;
    static readonly productItemThumbLink = (productUrl: string) => `a.product-tile__link[href*='${productUrl}'] div.product-tile__text--underline`;

    static readonly btnAddToCart = '#id-add-to-cart';
    static readonly btnQuickView = 'a.product-tile__link--active div button.quick-view-button';
    static readonly qickViewDialog = '#QuickViewDialog';
}