import { test } from "@playwright/test";
import test1VN from "./test1.spec";
import test2VN from "./test2.spec";
import test3VN from "./test3.spec";

// use test list to run
test.describe(test1VN);
test.describe(test2VN);
test.describe(test3VN);
