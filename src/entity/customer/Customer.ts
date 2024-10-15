import { Address } from "./Address";

export class Customer {
  private firstName: string;
  private lastName: string;
  private title: string | undefined;
  private signUpForNewsletter: string | undefined;
  private email: string;
  private password: string;
  private birthDay: string | undefined;
  private gender: string | undefined;
  private address: Address | undefined;

  constructor(customerBuilder: CustomerBuilder) {
    this["firstName"] = customerBuilder["firstName"];
    this["lastName"] = customerBuilder["lastName"];
    this["title"] = customerBuilder["title"];
    this["signUpForNewsletter"] = customerBuilder["signUpForNewsletter"];
    this["email"] = customerBuilder["email"];
    this["password"] = customerBuilder["password"];
    this["birthDay"] = customerBuilder["birthDay"];
    this["gender"] = customerBuilder["gender"];
    this["address"] = customerBuilder["address"];
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getTitle(): string | undefined {
    return this.title;
  }

  getSignUpForNewsletter(): string | undefined {
    return this.signUpForNewsletter;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getBirthDay(): string | undefined {
    return this.birthDay;
  }

  getGender(): string | undefined {
    return this.gender;
  }

  getAddress(): Address | undefined {
    return this.address;
  }
}

export class CustomerBuilder {
  private firstName: string;
  private lastName: string;
  private title: string | undefined;
  private signUpForNewsletter: string | undefined;
  private email: string;
  private password: string;
  private birthDay: string | undefined;
  private gender: string | undefined;
  private address: Address | undefined;

  private static instance: CustomerBuilder = new CustomerBuilder();

  static setFirstName(firstName: string): typeof CustomerBuilder {
    this.instance["firstName"] = firstName;
    return this;
  }

  static setLastName(lastName: string): typeof CustomerBuilder {
    this.instance["lastName"] = lastName;
    return this;
  }

  static setTitle(title: string): typeof CustomerBuilder {
    this.instance["title"] = title;
    return this;
  }

  static setSignUpForNewsletter(
    signUpForNewsletter: string
  ): typeof CustomerBuilder {
    this.instance["signUpForNewsletter"] = signUpForNewsletter;
    return this;
  }

  static setEmail(email: string): typeof CustomerBuilder {
    this.instance["email"] = email;
    return this;
  }

  static setPassword(password: string): typeof CustomerBuilder {
    this.instance["password"] = password;
    return this;
  }

  static setBirthDay(birthDay: string): typeof CustomerBuilder {
    this.instance["birthDay"] = birthDay;
    return this;
  }

  static setGender(gender: string): typeof CustomerBuilder {
    this.instance["gender"] = gender;
    return this;
  }

  static setAddress(address: Address): typeof CustomerBuilder {
    this.instance["address"] = address;
    return this;
  }

  static build(): Customer {
    return new Customer(this.instance);
  }
}
