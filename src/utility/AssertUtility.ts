import { test, expect } from "@playwright/test";

export default class AssertUtility {
  static async assertEqual(
    actual: string,
    expected: string,
    description?: string
  ) {
    // eslint-disable-next-line playwright/no-conditional-in-test
    await test.step(`Assert equal actual: ${actual} expected: ${expected} ${description ? " | Description: " + description : ""}`, async () => {
      expect.soft(actual).toEqual(expected);
    });
  }

  static async assertTrue(condition: boolean, description?: string) {
    // eslint-disable-next-line playwright/no-conditional-in-test
    await test.step(`Assert true actual: ${condition} ${description ? " | Description: " + description : ""}`, async () => {
      expect.soft(condition).toBeTruthy();
    });
  }
}
