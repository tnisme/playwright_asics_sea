export default class ProductDetailLocator {
    static readonly productColor = (color: string) => `//li[@data-sizevalue='${color}']`;
    static readonly productSize = (size: string) => `//li[@data-sizevalue='${size}']`;

    static readonly addToCartButton = '#id-add-to-cart';
    static readonly closeCartDrawButton = 'div.close-cart-draw';
}