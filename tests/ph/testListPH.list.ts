import {test} from "@playwright/test";
import test1PH from "./test1.spec";
import test2PH from "./test2.spec";

// use test list to run
test.describe(test1PH)
test.describe(test2PH)