declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      key?: string | number | undefined;
    }
  }
}

// eslint-disable-next-line unicorn/require-module-specifiers
export {};
