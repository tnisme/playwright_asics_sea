interface AddressAttributes {
    title: string;
    firstName: string;
    lastName: string;
    zipCode: string;
    city: string;
    state: string;
    address1: string;
    address2: string;
    phoneNumber: string;
    country: string;
    ward: string;
    barangay: string;
}

interface AddressBuilder {
    setTitle(title: string): AddressBuilder;
    setFirstName(firstName: string): AddressBuilder;
    setLastName(lastName: string): AddressBuilder;
    setZipCode(zipCode: string): AddressBuilder;
    setCity(city: string): AddressBuilder;
    setState(state: string): AddressBuilder;
    setAddress1(address1: string): AddressBuilder;
    setAddress2(address2: string): AddressBuilder;
    setPhoneNumber(phoneNumber: string): AddressBuilder;
    setCountry(country: string): AddressBuilder;
    setWard(ward: string): AddressBuilder;
    setBarangay(barangay: string): AddressBuilder;
    build(): AddressAttributes;
}

export default class Address implements AddressBuilder {

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

    setTitle(title: string): AddressBuilder {
        this.title = title;
        return this;
    }

    setAddress1(address1: string): AddressBuilder {
        this.address1 = address1;
        return this;
    }

    setAddress2(address2: string): AddressBuilder {
        this.address2 = address2;
        return this;
    }

    setBarangay(barangay: string): AddressBuilder {
        this.barangay = barangay;
        return this;
    }

    setCity(city: string): AddressBuilder {
        this.city = city;
        return this;
    }

    setCountry(country: string): AddressBuilder {
        this.country = country;
        return this;
    }

    setFirstName(firstName: string): AddressBuilder {
        this.firstName = firstName;
        return this;
    }

    setLastName(lastName: string): AddressBuilder {
        this.lastName = lastName;
        return this;
    }

    setPhoneNumber(phoneNumber: string): AddressBuilder {
        this.phoneNumber = phoneNumber;
        return this;
    }

    setState(state: string): AddressBuilder {
        this.state = state;
        return this;
    }

    setWard(ward: string): AddressBuilder {
        this.ward = ward;
        return this;
    }

    setZipCode(zipCode: string): AddressBuilder {
        this.zipCode = zipCode;
        return this;
    }

    build(): AddressAttributes {
        return {
            title: this.title,
            firstName: this.firstName,
            lastName: this.lastName,
            zipCode: this.zipCode,
            city: this.city,
            state: this.state,
            address1: this.address1,
            address2: this.address2,
            phoneNumber: this.phoneNumber,
            country: this.country,
            ward: this.ward,
            barangay: this.barangay
        };
    }
}
