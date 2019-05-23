export const imports = {
  'src/createpage/Form.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-createpage-form" */ 'src/createpage/Form.mdx'
    ),
  'src/createpage/Input.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-createpage-input" */ 'src/createpage/Input.mdx'
    ),
  'src/newspage/Entry.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-newspage-entry" */ 'src/newspage/Entry.mdx'
    ),
}
