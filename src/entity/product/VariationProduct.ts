import { Product, ProductBuilder } from "./Product";
import { ProductType } from "../data/ProductType";

export class VariationProduct extends Product {
  private color: string;
  private size: string;

  constructor(variationProductBuilder: VariationProductBuilder) {
    super(variationProductBuilder);
    this["color"] = variationProductBuilder["color"];
    this["size"] = variationProductBuilder["size"];
  }

  getColor(): string {
    return this["color"];
  }

  getSize(): string {
    return this["size"];
  }
}

export class VariationProductBuilder extends ProductBuilder {
  private color: string;
  private size: string;

  static instance: VariationProductBuilder = new VariationProductBuilder();

  constructor() {
    super();
    this["productType"] = ProductType.VARIATION;
  }

  static setColor(color: string): typeof VariationProductBuilder {
    this.instance["color"] = color;
    return this;
  }

  static setSize(size: string): typeof VariationProductBuilder {
    this.instance["size"] = size;
    return this;
  }

  static build(): VariationProduct {
    return new VariationProduct(this.instance);
  }
}
