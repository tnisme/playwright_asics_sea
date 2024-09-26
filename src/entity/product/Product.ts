import {ProductType} from "./ProductType";

export interface ProductAttributes {
    name: string
    price: number
    quantity: number
    sku: string
    width: string
    gender: string
    productType: ProductType
    url: string
    category: string
    store: string
    warehouseId: string
    erpProductId: string
    weight: number
}

export interface ProductBuilder {
    setName(name: string): ProductBuilder
    setPrice(price: number): ProductBuilder
    setQuantity(quantity: number): ProductBuilder
    setSku(sku: string): ProductBuilder
    setWidth(width: string): ProductBuilder
    setGender(gender: string): ProductBuilder
    setUrl(url: string): ProductBuilder
    setCategory(category: string): ProductBuilder
    setStore(store: string): ProductBuilder
    setWarehouseId(warehouseId: string): ProductBuilder
    setErpProductId(erpProductId: string): ProductBuilder
    setWeight(weight: number): ProductBuilder
    build(): ProductAttributes
}

export abstract class Product implements ProductBuilder {
    private name: string
    private price: number
    private quantity: number
    private sku: string
    private width: string
    private gender: string
    private productType: ProductType
    private url: string
    private category: string
    private store: string
    private warehouseId: string
    private erpProductId: string
    private weight: number


    setName(name: string): ProductBuilder {
        this.name = name;
        return this;
    }

    setPrice(price: number): ProductBuilder {
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): ProductBuilder {
        this.quantity = quantity;
        return this;
    }

    setSku(sku: string): ProductBuilder {
        this.sku = sku;
        return this;
    }

    setWidth(width: string): ProductBuilder {
        this.width = width;
        return this;
    }

    setGender(gender: string): ProductBuilder {
        this.gender = gender;
        return this;
    }

    setUrl(url: string): ProductBuilder {
        this.url = url;
        return this;
    }

    setCategory(category: string): ProductBuilder {
        this.category = category;
        return this;
    }

    setStore(store: string): ProductBuilder {
        this.store = store;
        return this;
    }

    setWarehouseId(warehouseId: string): ProductBuilder {
        this.warehouseId = warehouseId;
        return this;
    }

    setErpProductId(erpProductId: string): ProductBuilder {
        this.erpProductId = erpProductId;
        return this;
    }

    setWeight(weight: number): ProductBuilder {
        this.weight = weight;
        return this;
    }

    abstract setProductType(): void;

    build(): ProductAttributes {
        return {
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            sku: this.sku,
            width: this.width,
            gender: this.gender,
            productType: this.productType,
            url: this.url,
            category: this.category,
            store: this.store,
            warehouseId: this.warehouseId,
            erpProductId: this.erpProductId,
            weight: this.weight
        }
    }
}