import { test } from '@playwright/test';

// export function step<T extends (...args: any[]) => any>(target: T, context: ClassMethodDecoratorContext) {
//   return async function (this: any, ...args: Parameters<T>): Promise<ReturnType<T>> {
//     const stepName = `${this.constructor.name}.${String(context.name)}`;
//     return test.step(stepName, async () => target.apply(this, args));
//   };
// }

export function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = this.constructor.name + '.' + (context.name as string);
    return test.step(name, async () => {
      return await target.call(this, ...args);
    });
  };
}