import Address from "./Address";

export default class CustomerInformation {
    private firstName: string;
    private lastName: string;
    private title: string | undefined;
    private signUpForNewsletter: string | undefined;
    private email: string;
    private password: string;
    private birthDay: string | undefined;
    private gender: string | undefined;
    private address: Address | undefined;

    private constructor(builder: Builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.signUpForNewsletter = builder.signUpForNewsletter;
        this.email = builder.email;
        this.password = builder.password;
        this.title = builder.title;
        this.birthDay = builder.birthDay;
        this.gender = builder.gender;
        this.address = builder.address;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getTitle(): string | undefined {
        return this.title;
    }

    public getEmail(): string {
        return this.email;
    }

    public getSignUpForNewsletter(): string | undefined {
        return this.signUpForNewsletter;
    }

    public getPassword(): string {
        return this.password;
    }

    public getBirthDay(): string | undefined {
        return this.birthDay;
    }

    public getAddress(): Address | undefined {
        return this.address;
    }

    public getGender(): string | undefined {
        return this.gender;
    }

    public toString(): string {
        return `{First name: ${this.firstName} - Last name: ${this.lastName} - Email: ${this.email} - Password: ${this.password}}`;
    }

    // Builder class
    public static Builder = class{
    firstName!: string;
    lastName!: string;
    signUpForNewsletter?: string;
    email!: string;
    password!: string;
    title?: string;
    birthDay?: string;
    gender?: string;
    address?: Address;

    public setFirstName(firstName: string): this {
        this.firstName = firstName;
        return this;
    }

    public setLastName(lastName: string): this {
        this.lastName = lastName;
        return this;
    }

    public setTitle(title: string): this {
        this.title = title;
        return this;
    }

    public setSignUpForNewsletter(signUpForNewsletter: string): this {
        this.signUpForNewsletter = signUpForNewsletter;
        return this;
    }

    public setEmail(email: string): this {
        this.email = email;
        return this;
    }

    public setPassword(password: string): this {
        this.password = password;
        return this;
    }

    public setBirthDay(birthDay: string): this {
        this.birthDay = birthDay;
        return this;
    }

    public setGender(gender: string): this {
        this.gender = gender;
        return this;
    }

    public setAddress(address: Address): this {
        this.address = address;
        return this;
    }

    public build(): CustomerInformation {
        return new CustomerInformation(this);
    }
};
}

// Usage example
const customer = new CustomerInformation.Builder()
    .setFirstName("John")
    .setLastName("Doe")
    .setEmail("john.doe@example.com")
    .setPassword("password123")
    .setSignUpForNewsletter("yes")
    .setAddress(new Address("123 Main St", "New York", "NY", "10001"))
    .build();

console.log(customer.toString());
