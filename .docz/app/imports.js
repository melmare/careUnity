export const imports = {
  'src/TestComponent.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-test-component" */ 'src/TestComponent.mdx'
    ),
  'src/newspage/Entry.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-newspage-entry" */ 'src/newspage/Entry.mdx'
    ),
}
