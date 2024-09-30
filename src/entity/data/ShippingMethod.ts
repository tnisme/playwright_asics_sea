export enum ShippingMethod {
    STANDARD, NEXT_DAY, CLICK_AND_COLLECT, WEIGHT_LOCATION
}

export class ShippingMethodUtils {
    static getId(shippingMethod: ShippingMethod): string {
        switch (shippingMethod) {
            case ShippingMethod.STANDARD:
                return this.getIdMethodStandard();
            case ShippingMethod.NEXT_DAY:
                return this.getIdMethodNextDay();
            default: return 'not defined';
        }
    }

    static getName(shippingMethod: ShippingMethod): string {
        switch (shippingMethod) {
            case ShippingMethod.STANDARD:
                return 'Standard Delivery';
            case ShippingMethod.NEXT_DAY:
                return 'Next Day Delivery';
            case ShippingMethod.CLICK_AND_COLLECT:
                return 'Click and Collect';
            case ShippingMethod.WEIGHT_LOCATION:
                return 'Weight Location Delivery';
            default: return 'not defined';
        }
    }

    getIdMethodStandard(): string {
        switch (process.env.LOCATE) {
            case 'en_SG': return 'SGD001';
            case 'en_MY': return 'MYR001';
            case 'en_PH': return 'PHP004';
            case 'th_TH': return 'THB001';
            case 'vi_VN': return 'VND001';
            default: return 'not defined';
        }
    }

    getIdMethodNextDay(): string {
        switch (process.env.LOCATE) {
            case 'en_SG': return 'SGD002';
            case 'en_MY': return 'MYR003';
            case 'en_PH': return 'PHP002';
            case 'th_TH': return 'THB002';
            default: return 'not defined';
        }
    }
}