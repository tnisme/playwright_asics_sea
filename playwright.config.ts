import { defineConfig, devices } from '@playwright/test';
import testSuites from './test_suites';
import Browser from "./src/utility/Browser";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const timeInMin: number = 60 * 1000;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  // TODO turn off fully parallel to not run parallel in file
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: Number.parseInt(process.env.RETRIES, 10),
  /* Opt out of parallel tests on CI. */
  workers: Number.parseInt(process.env.PARALLEL_THREAD, 10),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  timeout: 0,
  reporter: [
    ["list"],
    ["allure-playwright", {
      detail: false,
      suiteTitle: false,
      environmentInfo: {
        OS: process.platform.toUpperCase(),
        BROWSER: process.env.BROWSER.toUpperCase(),
        BASE_URL: process.env.BASE_URL,
        NODE_VERSION: process.version,
      },
    }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* https://playwright.dev/docs/api/class-testoptions#test-options-browser-name */
    browserName: Browser.type(process.env.BROWSER.toLowerCase()),

    /* https://playwright.dev/docs/api/class-testoptions#test-options-channel */
    channel: Browser.channel(process.env.BROWSER.toLowerCase()),

    launchOptions: {
      args: ["--start-maximized", "--disable-extensions", "--disable-plugins"],
      headless: false,
      timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10) * timeInMin,
      slowMo: 100,
      downloadsPath: "./test-results/downloads",
    },
    viewport: null,
    actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT, 10) * timeInMin,
    navigationTimeout: Number.parseInt(process.env.NAVIGATION_TIMEOUT, 10) * timeInMin,
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
  },

  projects: [
    {
      name: "local",
      /* https://playwright.dev/docs/test-configuration#filtering-tests */
      testMatch: testSuites[process.env.SUITE || "all"],
    },
  ],
});
