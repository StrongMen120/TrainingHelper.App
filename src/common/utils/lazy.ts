export function lazy<T>(creator: () => T) {
  let cache: T | undefined = undefined;

  return {
    get isInitialized() {
      return creator === undefined;
    },
    /** @deprecated Use value getter instead */
    get(): T {
      if (!this.isInitialized) {
        cache = creator.call(null);
        creator = undefined!;
      }

      return cache!;
    },
    get value() {
      return this.get();
    },
  };
}
