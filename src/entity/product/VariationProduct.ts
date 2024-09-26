import {Product, ProductAttributes, ProductBuilder} from "./Product";
import {ProductType} from "./ProductType";

interface VariationProductAttributes extends ProductAttributes {
    color: string;
    size: string;
}

interface VariationProductBuilder extends ProductBuilder {
    setColor(color: string): VariationProductBuilder;
    setSize(size: string): VariationProductBuilder;
    build(): VariationProductAttributes
}

export default class VariationProduct extends Product implements VariationProductBuilder {
    private color: string;
    private size: string;

    constructor() {
        super();
        this.setProductType()
    }

    setColor(color: string): VariationProductBuilder {
        this.color = color;
        return this;
    }

    setSize(size: string): VariationProductBuilder {
        this.size = size;
        return this;
    }

    setProductType = () => {
        this['productType'] = ProductType.VARIATION
    };

    build(): VariationProductAttributes {
        const productAttributes = super.build();
        return {
            ...productAttributes,
            color: this.color,
            size: this.size
        };
    }
}