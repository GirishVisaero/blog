import Link from 'next/link';

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link className="text-gray-500 hover:text-gray-600 transition" href="/">
            Home
          </Link>
          <Link className="text-gray-500 hover:text-gray-600 transition" href="/about">
              About
          </Link>
          <Link className="text-gray-500 hover:text-gray-600 transition" href="/blog">
            Blog
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="/">
            Twitter
          </ExternalLink>
          <ExternalLink href="https://in.linkedin.com/in/girish-chaudhari-b14ba3161">
            LinkedIn
          </ExternalLink>
          <ExternalLink href="https://github.com/girish-chaudhari">GitHub</ExternalLink>
          <ExternalLink href="/">
            YouTube
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link className="text-gray-500 hover:text-gray-600 transition" href="/blog/code">
            Code
          </Link>
          <Link className="text-gray-500 hover:text-gray-600 transition" href="/blog/life">
            Life
          </Link>
          <Link className="text-gray-500 hover:text-gray-600 transition" href="/blog/misc">
            Misc
          </Link>
        </div>
      </div>
    </footer>
  );
}
