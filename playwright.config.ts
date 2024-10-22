import { defineConfig } from "@playwright/test";
import Browser from "./src/utility/Browser";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
import { fixtureData } from "@fixture/DataFixture";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const timeInSec: number = 1000;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<fixtureData>({
  testDir: "./tests",
  /* Run tests in files in parallel */
  // turn off fully parallel to not run parallel in file
  fullyParallel: false,
  /* Opt out of parallel tests on CI. */
  workers: Number.parseInt(process.env.PARALLEL_THREAD, 10),
  timeout: 0,
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        detail: false,
        suiteTitle: false,
        environmentInfo: {
          OS: process.platform.toUpperCase(),
          BROWSER: process.env.BROWSER.toUpperCase(),
          BASE_URL: process.env.BASE_URL,
          NODE_VERSION: process.version,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* https://playwright.dev/docs/api/class-testoptions#test-options-browser-name */
    browserName: Browser.type(process.env.BROWSER.toLowerCase()),

    /* https://playwright.dev/docs/api/class-testoptions#test-options-channel */
    channel: Browser.channel(process.env.BROWSER.toLowerCase()),

    launchOptions: {
      args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
      headless: false,
      timeout:
        Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10) * timeInSec,
      slowMo: 500,
    },
    viewport: null,
    actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT, 10) * timeInSec,
    navigationTimeout:
      Number.parseInt(process.env.NAVIGATION_TIMEOUT, 10) * timeInSec,
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
  },

  projects: [
    {
      name: "en-SG",
      use: {
        locale: "en-SG",
        currency: "SGD",
      },
      /* https://playwright.dev/docs/test-configuration#filtering-tests */
      testMatch: "*/tests/sg/*.spec.ts",
    },
    {
      name: "en-MY",
      use: {
        locale: "en-MY",
        currency: "MYR",
      },
      /* https://playwright.dev/docs/test-configuration#filtering-tests */
      testMatch: "*/tests/my/*.spec.ts",
    },
  ],
});
