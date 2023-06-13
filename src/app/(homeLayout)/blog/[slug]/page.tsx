import RemoteMDX from '@/components/RemoteMDX';
import BlogLayout from '@/layouts/blog';
import { mdxToHtml } from '@/lib/mdx';


type Props = {};

let postData = {
  id: '64834f4964ab0101da00f920',
  name: 'markup',
  title: 'first blog',
  tagName: 'nextjs',
  content: "# rehype-code-titles\n\n[![npm](https://img.shields.io/npm/v/rehype-code-titles?style=flat-square)](https://www.npmjs.com/package/rehype-code-titles)\n\n[![All Contributors](https://img.shields.io/github/all-contributors/projectOwner/projectName?color=ee8449&style=flat-square)](#contributors)\n\n Rehype plugin for parsing code blocks and adding titles to code blocks\n\n## Why?\n\nI moved my blog over to using [`mdx-bundler`](https://github.com/kentcdodds/mdx-bundler) which uses [`xdm`](https://github.com/wooorm/xdm) under the hood to parse the markdown and MDX files. I was using [`remark-code-titles`](https://github.com/mottox2/remark-code-titles#readme) prior to this move and unfortunately it no longer worked. I believe this was because of the order plugins were being applied internally for `xdm`. I'd never really worked with `remark` or `rehype` directly before and didn't have a lot of experience with ASTs so this was a fun little project that I initially built directly into my blog before pulling it out at a plugin to ship to other developers.\n\nMany thanks to [@mottox2](https://github.com/mottox2), [@mapbox](https://github.com/mapbox), & [@wooorm](https://github.com/wooorm) for their prior work in this ecosystem it was of great help when creating this plugin.\n\n## Installation\n\n> This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):\n\n> Node 12+ is needed to use it and it must be `import`ed instead of `require`d.\n\n```shell:bash\nnpm install rehype-code-titles\n\nyarn add rehype-code-titles\n\npnpm add rehype-code-titles\n\n```\n\n## API\n\nThis package exports no identifiers. The default export is `rehypeCodeTitles`\n\n### `rehype().use(rehypeCodeTitles[, options])`\n\nAdd support for stripping out code titles from input.\n\n#### `options`\n\n##### `options.customClassName`\n\nSpecify your own custom css class name to apply. Defaults to `rehype-code-title`.\n\nNote: you will have to write the CSS implementation yourself.\n\nFor example\n\n```css:styles.css\n\n// some global css file\n.rehype-code-title {\nmargin-bottom: -0.6rem;\npadding: 0.5em 1em;\nfont-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',\n'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',\n'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,\nmonospace;\n\nbackground-color: black;\ncolor: white;\nz-index: 0;\nborder-top-left-radius: 0.3em;\nborder- top - right - radius: 0.3em;\n\n}\n\n```\n\n",
  published: false,
  authorId: '647acd3df2c57d976165715a',
  createdAt: '2023-06-09T16:11:50.062Z',
  updatedAt: '2023-06-09T16:11:50.062Z'
};

const getServerData = async () => {
  const { html, readingTime } = await mdxToHtml(postData.content);
  return {
    post: {
      heading: postData.name,
      content: html,
      description: postData.title,
      date: postData.createdAt,
      socialImage: '/',
      slug: '/',
      tags: ['next.js'],
      readingTime: readingTime,
      tag: [{ tagName: 'next.js' }]
    }
  };
};

const page = async (props: Props) => {
  let { post } = await getServerData();
  return (
    <BlogLayout post={post}>
      <RemoteMDX content={post.content} />
    </BlogLayout>
  );
};

export default page;
