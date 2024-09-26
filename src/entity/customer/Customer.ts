import Address from "./Address";

interface Customer {
    firstName: string;
    lastName: string;
    title: string | undefined;
    signUpForNewsletter: string | undefined;
    email: string;
    password: string;
    birthDay: string | undefined;
    gender: string | undefined;
    address: Address | undefined;
}

interface CustomerBuilder {
    setFirstName(firstName: string): CustomerBuilder;
    setLastName(lastName: string): CustomerBuilder;
    setTitle(title: string): CustomerBuilder;
    setSignUpForNewsletter(signUpForNewsletter: string): CustomerBuilder;
    setEmail(email: string): CustomerBuilder;
    setPassword(password: string): CustomerBuilder;
    setBirthDay(birthDay: string): CustomerBuilder;
    setGender(gender: string): CustomerBuilder;
    setAddress(address: Address): CustomerBuilder;
    build(): Customer;
}

export default class CustomerInformation implements CustomerBuilder {
    private firstName: string;
    private lastName: string;
    private title: string | undefined;
    private signUpForNewsletter: string | undefined;
    private email: string;
    private password: string;
    private birthDay: string | undefined;
    private gender: string | undefined;
    private address: Address | undefined;

    setAddress(address: Address): CustomerBuilder {
        this.address = address;
        return this;
    }

    setBirthDay(birthDay: string): CustomerBuilder {
        this.birthDay = birthDay;
        return this;
    }

    setEmail(email: string): CustomerBuilder {
        this.email = email;
        return this;
    }

    setFirstName(firstName: string): CustomerBuilder {
        this.firstName = firstName;
        return this;
    }

    setGender(gender: string): CustomerBuilder {
        this.gender = gender;
        return this;
    }

    setLastName(lastName: string): CustomerBuilder {
        this.lastName = lastName;
        return this;
    }

    setPassword(password: string): CustomerBuilder {
        this.password = password;
        return this;
    }

    setSignUpForNewsletter(signUpForNewsletter: string): CustomerBuilder {
        this.signUpForNewsletter = signUpForNewsletter;
        return this;
    }

    setTitle(title: string): CustomerBuilder {
        this.title = title;
        return this;
    }

    build(): Customer {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            title: this.title,
            signUpForNewsletter: this.signUpForNewsletter,
            email: this.email,
            password: this.password,
            birthDay: this.birthDay,
            gender: this.gender,
            address: this.address,
        };
    }
}