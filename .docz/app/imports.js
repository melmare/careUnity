export const imports = {
  'src/newspage/Entry.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-newspage-entry" */ 'src/newspage/Entry.mdx'
    ),
  'src/newspage/EntryForm.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-newspage-entry-form" */ 'src/newspage/EntryForm.mdx'
    ),
  'src/newspage/Input.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-newspage-input" */ 'src/newspage/Input.mdx'
    ),
}
