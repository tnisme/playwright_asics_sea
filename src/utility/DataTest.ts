import CustomerInformation from "../entity/customer/Customer";
import VariationProduct from "../entity/product/VariationProduct";

import fs = require('fs'); // import * as fs from 'fs';
import * as path from 'path';
import dotenv = require('dotenv');

const customerData = fs.readFileSync(path.join(__dirname, '..', 'data', 'account.json'), 'utf8');
const productData = fs.readFileSync(path.join(__dirname, '..', 'data', 'product.json'), 'utf8');
// const productData = fs.readFileSync('src/data/product.json', 'utf8'); TODO why can not find file if using this?
const customerJSON = JSON.parse(customerData);
const variationProductJSON = JSON.parse(productData);

dotenv.config();


export class DataTest {
    static getCustomerInformation(): CustomerInformation {
        const environment = process.env.ENVIRONMENT;
        const locate = process.env.LOCATE;
        const customer = customerJSON[environment][locate].customer1;
        return <CustomerInformation> new CustomerInformation()
            .setAddress(customer.address)
            .setBirthDay(customer.birthDay)
            .setEmail(customer.email)
            .setFirstName(customer.firstName)
            .setGender(customer.gender)
            .setLastName(customer.lastName)
            .setPassword(customer.password)
            .setSignUpForNewsletter(customer.signUpForNewsletter)
            .setTitle(customer.title)
    }
}

const cus = DataTest.getCustomerInformation();
console.log(cus);