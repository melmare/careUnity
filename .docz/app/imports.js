export const imports = {
  'src/TestComponent.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-test-component" */ 'src/TestComponent.mdx'
    ),
  'src/blog/Entry.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-blog-entry" */ 'src/blog/Entry.mdx'
    ),
}
