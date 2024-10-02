import { test } from "@playwright/test";
import test1TH from "./test1.spec";
import test2TH from "./test2.spec";
import test3TH from "./test3.spec";

// use test list to run
test.describe(test1TH);
test.describe(test2TH);
test.describe(test3TH);
