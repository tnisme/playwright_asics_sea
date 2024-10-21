import { mergeTests } from "@playwright/test";
import { test as dataFixture } from "./DataFixture";
import { test as pageFixture } from "./PageFixture";

export const test = mergeTests(dataFixture, pageFixture);

export function step(stepName?: string) {
  // 2. Return the original decorator
  return function decorator(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    // eslint-disable-next-line
    return function replacementMethod(...args: any) {
      // 3. Use `stepName` when it's defined or
      // fall back to class name / method name
      const name =
        stepName || `${this.constructor.name + "." + (context.name as string)}`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
