import { mergeTests } from "@playwright/test";
import { test as dataFixture } from "./DataFixture";
import { test as pageFixture } from "./PageFixture";

export const test = mergeTests(dataFixture, pageFixture);
