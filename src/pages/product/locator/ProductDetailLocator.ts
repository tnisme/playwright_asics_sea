export default class ProductDetailLocator {
    protected productColor = (color: string) => `//li[@data-sizevalue='${color}']`;
    protected productSize = (size: string) => `//li[@data-sizevalue='${size}']`;

    protected addToCartButton = '#id-add-to-cart';
    protected closeCartDrawButton = 'div.close-cart-draw';
}