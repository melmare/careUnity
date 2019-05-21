export const imports = {
  'src/newspage/Entry.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-newspage-entry" */ 'src/newspage/Entry.mdx'
    ),
}
