import {CreditCardType} from "../data/CreditCardType";

export class CreditCard {
    private name: string;
    private number: string;
    private month: string;
    private year: string;
    private cid: string;
    private type: CreditCardType;
    private username: string;
    private password: string;

    constructor(creditCardBuilder: CreditCardBuilder) {
        this['name'] = creditCardBuilder['name'];
        this['number'] = creditCardBuilder['number'];
        this['month'] = creditCardBuilder['month'];
        this['year'] = creditCardBuilder['year'];
        this['cid'] = creditCardBuilder['cid'];
        this['type'] = creditCardBuilder['type'];
        this['username'] = creditCardBuilder['username'];
        this['password'] = creditCardBuilder['password'];
    }

    getName(): string {
        return this['name'];
    }

    getNumber(): string {
        return this['number'];
    }

    getMonth(): string {
        return this['month'];
    }

    getYear(): string {
        return this['year'];
    }

    getCid(): string {
        return this['cid'];
    }

    getType(): CreditCardType {
        return this['type'];
    }

    getUsername(): string {
        return this['username'];
    }

    getPassword(): string {
        return this['password'];
    }
}

export class CreditCardBuilder {
    private name: string;
    private number: string;
    private month: string;
    private year: string;
    private cid: string;
    private type: CreditCardType;
    private username: string;
    private password: string;

    private static instance: CreditCardBuilder = new CreditCardBuilder();

    static setName(name: string): typeof CreditCardBuilder {
        this.instance['name'] = name;
        return this;
    }

    static setNumber(number: string): typeof CreditCardBuilder {
        this.instance['number'] = number;
        return this;
    }

    static setMonth(month: string): typeof CreditCardBuilder {
        this.instance['month'] = month;
        return this;
    }

    static setYear(year: string): typeof CreditCardBuilder {
        this.instance['year'] = year;
        return this;
    }

    static setCid(cid: string): typeof CreditCardBuilder {
        this.instance['cid'] = cid;
        return this;
    }

    static setType(type: CreditCardType): typeof CreditCardBuilder {
        this.instance['type'] = type;
        return this;
    }

    static setUsername(username: string): typeof CreditCardBuilder {
        this.instance['username'] = username;
        return this;
    }

    static setPassword(password: string): typeof CreditCardBuilder {
        this.instance['password'] = password;
        return this;
    }

    static build(): CreditCard {
        return new CreditCard(this.instance);
    }
}