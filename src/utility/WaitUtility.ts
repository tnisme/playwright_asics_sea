import {Page} from "@playwright/test";
import {Locator} from "@playwright/test";

export default class WaitUtility {

    constructor(page: Page) {
    }

    /**
     *
     * @param element
     * @param timeout millisecond (optional)
     *
     * if timeout is not specified, it will use TEST_TIMEOUT
     */

    async waitUntilVisibilityOf(element: Locator, timeout?: number) {
        const effectiveTimeout = timeout ?? Number.parseInt(process.env.TEST_TIMEOUT, 10);
        await element.waitFor({ state: 'visible', timeout: effectiveTimeout });
    }
}