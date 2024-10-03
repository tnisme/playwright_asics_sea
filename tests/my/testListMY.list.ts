import { test } from "@playwright/test";
import test1MY from "./test1.spec";
import test2MY from "./test2.spec";
import test3MY from "./test3.spec";

// use test list to run
test.describe(test1MY);
test.describe(test2MY);
test.describe(test3MY);
