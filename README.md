# Asics SEA Automation Tests

This project contains automated tests for the [Asics](https://www.asics.com) website, specifically targeting the Southeast Asia (SEA) region. The tests are written using **Playwright** and **TypeScript** to verify basic functionalities like loading the home page, searching for products, and checking product details.

## Project Overview

The main goal of this project is to automate the testing of key user interactions on the Asics SEA website using **Playwright**. It supports:

- Multiple browsers (Chromium, Firefox, WebKit, Chrome)
- Screenshot on test failure
- Easy configuration for locale and base URL for SEA region testing

## Installation

To set up and run the tests locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/asics-playwright-tests.git

   ```
2. **Navigate to the repository**:
   ```bash
   cd asics-playwright-tests
   ```
3. **Install dependencies**:
   ```bash
    npm install
   ```

## Running Tests

To run the tests, follow these steps:

### Configuration

To configure the tests, follow these steps:

1. Rename file **.env.template** to **.env** or create a new one.
2. Add your **BASE_URL** in the .env file.
   ```
   BASE_URL=
   ```

### Run tests:

1.  To run full test suite:

    ```bash
    npm run test
    ```

2.  To run a single test:

    ```bash
    npm run test <path_to_test_file>
    ```

## View report:

To generate Allure report use below command

```bash
npm run report
```

## Commit and push

Before committing and pushing, make sure you have run this command to init [husky](https://www.npmjs.com/package/husky).

```bash
npx husky init
```
