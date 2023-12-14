export class HookManager {
  private static beforeHooks: { [key: string]: any[] } = {};
  private static afterHooks: { [key: string]: any[] } = {};

  static addBeforeHook(methodName: string, hookFunction: any): void {
    if (!this.beforeHooks[methodName]) {
      this.beforeHooks[methodName] = [];
    }
    this.beforeHooks[methodName].push(hookFunction);
  }

  static addAfterHook(methodName: string, hookFunction: any): void {
    if (!this.afterHooks[methodName]) {
      this.afterHooks[methodName] = [];
    }
    this.afterHooks[methodName].push(hookFunction);
  }

  static async runBeforeHooks(
    methodName: string,
    ...args: any[]
  ): Promise<void> {
    if (this.beforeHooks[methodName]) {
      for (const hook of this.beforeHooks[methodName]) {
        await hook(...args);
      }
    }
  }

  static async runAfterHooks(
    methodName: string,
    result: any,
    ...args: any[]
  ): Promise<any> {
    if (this.afterHooks[methodName]) {
      for (const hook of this.afterHooks[methodName]) {
        result = await hook(result, ...args);
      }
    }
    return result;
  }
}
