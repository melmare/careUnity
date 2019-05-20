export const imports = {
  'src/TestComponent.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-test-component" */ 'src/TestComponent.mdx'
    ),
}
