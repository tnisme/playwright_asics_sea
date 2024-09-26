export class Address {
    private title: string;
    private firstName: string;
    private lastName: string;
    private zipCode: string;
    private city: string;
    private state: string;
    private address1: string;
    private address2: string;
    private phoneNumber: string;
    private country: string;
    private ward: string;
    private barangay: string;

    constructor(addressBuilder: AddressBuilder) {
        this['title'] = addressBuilder['title'];
        this['firstName'] = addressBuilder['firstName'];
        this['lastName'] = addressBuilder['lastName'];
        this['zipCode'] = addressBuilder['zipCode'];
        this['city'] = addressBuilder['city'];
        this['state'] = addressBuilder['state'];
        this['address1'] = addressBuilder['address1'];
        this['address2'] = addressBuilder['address2'];
        this['phoneNumber'] = addressBuilder['phoneNumber'];
        this['country'] = addressBuilder['country'];
        this['ward'] = addressBuilder['ward'];
        this['barangay'] = addressBuilder['barangay'];
    }

    getTitle(): string {
        return this.title;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getZipCode(): string {
        return this.zipCode;
    }

    getCity(): string {
        return this.city;
    }

    getState(): string {
        return this.state;
    }

    getAddress1(): string {
        return this.address1;
    }

    getAddress2(): string {
        return this.address2;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getCountry(): string {
        return this.country;
    }

    getWard(): string {
        return this.ward;
    }

    getBarangay(): string {
        return this.barangay;
    }
}

export class AddressBuilder {
    private title: string;
    private firstName: string;
    private lastName: string;
    private zipCode: string;
    private city: string;
    private state: string;
    private address1: string;
    private address2: string;
    private phoneNumber: string;
    private country: string;
    private ward: string;
    private barangay: string;

    private static instance: AddressBuilder = new AddressBuilder();

    static setTitle(title: string): typeof AddressBuilder {
        this.instance['title'] = title;
        return this;
    }

    static setFirstName(firstName: string): typeof AddressBuilder {
        this.instance['firstName'] = firstName;
        return this;
    }

    static setLastName(lastName: string): typeof AddressBuilder {
        this.instance['lastName'] = lastName;
        return this;
    }

    static setZipCode(zipCode: string): typeof AddressBuilder {
        this.instance['zipCode'] = zipCode;
        return this;
    }

    static setCity(city: string): typeof AddressBuilder {
        this.instance['city'] = city;
        return this;
    }

    static setState(state: string): typeof AddressBuilder {
        this.instance['state'] = state;
        return this;
    }

    static setAddress1(address1: string): typeof AddressBuilder {
        this.instance['address1'] = address1;
        return this;
    }

    static setAddress2(address2: string): typeof AddressBuilder {
        this.instance['address2'] = address2;
        return this;
    }

    static setPhoneNumber(phoneNumber: string): typeof AddressBuilder {
        this.instance['phoneNumber'] = phoneNumber;
        return this;
    }

    static setCountry(country: string): typeof AddressBuilder {
        this.instance['country'] = country;
        return this;
    }

    static setWard(ward: string): typeof AddressBuilder {
        this.instance['ward'] = ward;
        return this;
    }

    static setBarangay(barangay: string): typeof AddressBuilder {
        this.instance['barangay'] = barangay;
        return this;
    }

    static build(): Address {
        return new Address(this.instance);
    }
}