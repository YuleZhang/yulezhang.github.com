# Deployment workflow

## Required Hexo preview

Before publishing any site change, build and preview it with Hexo from the Hexo source project (currently `/Users/zhangyu/Website` in this workspace):

```sh
./node_modules/.bin/hexo clean
./node_modules/.bin/hexo generate
./node_modules/.bin/hexo server --port 4000
```

Open the changed page on the local Hexo server and review it in a browser. Do not publish directly from edited Markdown or generated files. Publish only after the local preview has been reviewed and the change has followed the repository's merge process. After publishing, open the live URL and verify the change there.

## Required table checks

Confirm every changed Markdown table twice before publishing:

1. **Generated structure:** confirm Hexo emitted a real HTML `<table>` with the expected headers and rows, and that raw Markdown pipe syntax is absent from the rendered content.
2. **Visual layout:** inspect the local preview at desktop and narrow mobile widths. Check column alignment, readable cell content, captions, and horizontal scrolling where a table is wider than the viewport. Make sure the table does not cause page-level horizontal overflow.

Record both checks in the change review. If either check fails, update the source and repeat the Hexo preview before publishing.
