import { test } from "@playwright/test";

// ref. https://playwright.dev/docs/next/test-annotations#tag-tests
// use tag test to run daily or regression with specific test
// use npx playwright test --grep @<tag name>
// => why use 'npx playwright test --grep @d' and playwright know we want to run tag daily? TODO
export default function test1MY() {
  test("test1my @daily", async ({ page }) => {
    console.log("first my");
  });
}
