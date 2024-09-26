import {test} from "@playwright/test";
import test1SG from "./test1.spec";
import testRegressionSG from "./test2.spec";
import test3SG from "./test3.spec";

// use test list to run follow order
// ref. https://playwright.dev/docs/next/test-parallel#use-a-test-list-file TODO
test.describe(test1SG)
test.describe(testRegressionSG)
test.describe(test3SG)
