export const imports = {
  'src/newspage/Entry.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-newspage-entry" */ 'src/newspage/Entry.mdx'
    ),
  'src/newspage/Form.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-newspage-form" */ 'src/newspage/Form.mdx'
    ),
  'src/newspage/Input.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-newspage-input" */ 'src/newspage/Input.mdx'
    ),
}
