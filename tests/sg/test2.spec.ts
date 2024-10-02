import { test } from "@playwright/test";

export default function testRegressionSG() {
  test("test2sg", async ({ page }) => {
    console.log("regression sg");
  });
}
