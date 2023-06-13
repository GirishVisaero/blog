'use client';

import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import components from './MDXComponents';

type Props = {
  content: any;
};

const RemoteMDX = ({ content }) => {
  return (
    <MDXRemote
      {...content}
      components={
        {
          ...components
        } as any
      }
    />
  );
};

export default RemoteMDX;
