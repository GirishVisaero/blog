import BlogLayout from '@/layouts/blog';
import { mdxToHtml } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import components from '@/components/MDXComponents';
import RemoteMDX from '@/components/RemoteMDX';


type Props = {};

let postData = {
  id: '64834f4964ab0101da00f920',
  name: 'markup',
  title: 'first blog',
  tagName: 'nextjs',
  content:
    '\n <WatchOnYouTube videoId="lD7i1jGBeMk" title="woeking" /> \n A paragraph with *emphasis* and **strong importance**.\n\n> A block quote with ~strikethrough~ and a URL: https://reactjs.org.\n\n* Lists\n* [ ] todo\n* [x] done\n\nA table:\n\n| a | b |\n| - | - |\n\nThis is a [Next.js](https://nextjs.org/) project bootstrapped with [\'create-next-app\'](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).\n\n## Getting Started\n\nFirst, run the development server:\n\n~~~bash\nnpm run dev\n# or\nyarn dev\n\n~~~\n\nOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.\n\nYou can start editing the page by modifying \'pages/index.js\'. The page auto-updates as you edit the file.\n\n[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in \'pages/api/hello.js\'.\n\nThe \'pages/api\' directory is mapped to \'/api/*\'. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.\n\n## Learn More\n\nTo learn more about Next.js, take a look at the following resources:\n\n- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.\n- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.\n\nYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!\n\n## Deploy on Vercel\n\n <youtube videoId="dQw4w9WgXcQ" /> \n\nThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.\n\nCheck out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.\n\n\n\n~~~jsx /carrot/ /apple/\nconsole.log(\'It works!\')\n\n\n"use client";\nimport React from "react";\nimport ReactMarkdown from "react-markdown";\nimport remarkGfm from "remark-gfm";\nimport rehypeRaw from "rehype-raw";\nimport { Prism as SyntaxHighlighter } from "react-syntax-highlighter";\nimport { dracula} from "react-syntax-highlighter/dist/esm/styles/prism";\n\ninterface MarkDownProps {\n  children?: React.ReactNode;\n  content: string | any;\n}\n\nconst MarkDownReader: React.FC<MarkDownProps> = ({ children, content }) => {\n\n  return (\n    <>\n      <ReactMarkdown\n        children={content}\n        rehypePlugins={[rehypeRaw]}\n        remarkPlugins={[remarkGfm]}\n        components={{\n            a: ({node, ...props}) => <a className="text-[#484cff]" {...props} />,\n          code({ node, inline, className, children, ...props }) {\n            const match = /language-(\\w+)/.exec(className || "");\n            return !inline && match ? (\n              <SyntaxHighlighter\n              customStyle={{fontSize:14}}\n                {...props}\n                wrapLongLines\n                showLineNumbers\n                children={String(children).replace(/\\n$/, "")}\n                style={dracula}\n                language={match[1]}\n                PreTag="div"\n              />\n            ) : (\n              <code {...props} className={className}>\n                {children}\n              </code>\n            );\n          },\n        }}\n      />\n    </>\n  );\n};\n\nexport default MarkDownReader;\n\n~~~',
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
      slug:'/',
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
      {/* <MDXRemote
        {...post.content}
        components={
          {
            ...components
          } as any
        }
      /> */}
    </BlogLayout>
  );
};

export default page;
