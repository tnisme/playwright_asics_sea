import { ProductType } from "../data/ProductType";

export class Product {
  private name: string;
  private price: number;
  private quantity: number;
  private sku: string;
  private width: string;
  private gender: string;
  private productType: ProductType;
  private url: string;
  private category: string;
  private store: string;
  private warehouseId: string;
  private erpProductId: string;
  private weight: number;

  constructor(productBuilder: ProductBuilder) {
    this["name"] = productBuilder["name"];
    this["price"] = productBuilder["price"];
    this["quantity"] = productBuilder["quantity"];
    this["sku"] = productBuilder["sku"];
    this["width"] = productBuilder["width"];
    this["gender"] = productBuilder["gender"];
    this["productType"] = productBuilder["productType"];
    this["url"] = productBuilder["url"];
    this["category"] = productBuilder["category"];
    this["store"] = productBuilder["store"];
    this["warehouseId"] = productBuilder["warehouseId"];
    this["erpProductId"] = productBuilder["erpProductId"];
    this["weight"] = productBuilder["weight"];
  }

  getName(): string {
    return this["name"];
  }

  getPrice(): number {
    return this["price"];
  }

  getQuantity(): number {
    return this["quantity"];
  }

  getSku(): string {
    return this["sku"];
  }

  getWidth(): string {
    return this["width"];
  }

  getGender(): string {
    return this["gender"];
  }

  getProductType(): ProductType {
    return this["productType"];
  }

  getUrl(): string {
    return this["url"];
  }

  getCategory(): string {
    return this["category"];
  }

  getStore(): string {
    return this["store"];
  }

  getWarehouseId(): string {
    return this["warehouseId"];
  }

  getErpProductId(): string {
    return this["erpProductId"];
  }

  getWeight(): number {
    return this["weight"];
  }
}

export class ProductBuilder {
  private name: string;
  private price: number;
  private quantity: number;
  private sku: string;
  private width: string;
  private gender: string;
  private url: string;
  private category: string;
  private store: string;
  private warehouseId: string;
  private erpProductId: string;
  private weight: number;
  protected productType: ProductType = ProductType.SINGLE;

  static instance: ProductBuilder = new ProductBuilder();

  static setName(name: string): typeof ProductBuilder {
    this.instance["name"] = name;
    return this;
  }

  static setPrice(price: number): typeof ProductBuilder {
    this.instance["price"] = price;
    return this;
  }

  static setQuantity(quantity: number): typeof ProductBuilder {
    this.instance["quantity"] = quantity;
    return this;
  }

  static setSku(sku: string): typeof ProductBuilder {
    this.instance["sku"] = sku;
    return this;
  }

  static setWidth(width: string): typeof ProductBuilder {
    this.instance["width"] = width;
    return this;
  }

  static setGender(gender: string): typeof ProductBuilder {
    this.instance["gender"] = gender;
    return this;
  }

  static setUrl(url: string): typeof ProductBuilder {
    this.instance["url"] = url;
    return this;
  }

  static setCategory(category: string): typeof ProductBuilder {
    this.instance["category"] = category;
    return this;
  }

  static setStore(store: string): typeof ProductBuilder {
    this.instance["store"] = store;
    return this;
  }

  static setWarehouseId(warehouseId: string): typeof ProductBuilder {
    this.instance["warehouseId"] = warehouseId;
    return this;
  }

  static setErpProductId(erpProductId: string): typeof ProductBuilder {
    this.instance["erpProductId"] = erpProductId;
    return this;
  }

  static setWeight(weight: number): typeof ProductBuilder {
    this.instance["weight"] = weight;
    return this;
  }

  static setProductType(productType: ProductType): typeof ProductBuilder {
    this.instance["productType"] = productType;
    return this;
  }

  static build(): Product {
    return new Product(this.instance);
  }
}
