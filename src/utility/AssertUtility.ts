import { test, expect } from "@playwright/test";

export default class AssertUtility {
  static async assertEqual(actual: string, expected: string, message?: string) {
    await test.step(`Assert equal actual: ${actual} expected: ${expected}`, async () => {
      expect.soft(actual, message).toEqual(expected);
    });
  }

  static async assertTrue(condition: boolean, message?: string) {
    await test.step(`Assert true actual: ${condition}`, async () => {
      expect.soft(condition, message).toBeTruthy();
    });
  }
}
