import Container from '@/components/Container'
import { Metadata } from 'next'
import React from 'react'

type Props = {}

export const metadata: Metadata = {
  title: 'About – Girish Chaudhari',
}

const about = (props: Props) => {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          /about
        </h1>
        <p className="text-black dark:text-white mb-4">
          My name is Girish Chaudhari and I am a web developer and computer
          science tutor from{' '}
          <a
            href="https://en.wikipedia.org/wiki/Jalgaon_district"
            target="blank"
            rel="noopener noreferrer"
          >
            Jalgaon, Maharashtra
          </a>
          .
        </p>
        <p className="text-black dark:text-white mb-4">
          I have a Bachelor of Computer Science from The Dhariwal collage
          Jamner, and for about 1 year, I worked full-time for a local company
          as a web developer, mainly using MEAN & MERN. I enjoyed working at
          this company but was ready for something new.
        </p>
        <p className="text-black dark:text-white mb-6">
          In early 2022, I started my career as a fresher. I learnt everything
          what developer needs to have. I can now say, I seriously love
          devlopment. I really enjoy building web apps with react and seeing the
          development future, I essentaily working on my coding skills. Also,
          since I started writing a blog, I have started working on many more{' '}
          <b>personal coding projects.</b>{' '}
          {/* <Link href="blog/personal-projects" >personal coding projects.</Link>{' '} */}
          This has enabled me to learn new skills, such as Next.js, Mdx blog,
          API and much more.
        </p>
        {/* <p className="text-black dark:text-white mb-6">
          In February 2023, I sold my online game,{' '}
          <a href="https://wheretaken.teuteuf.fr">WhereTaken</a> to MPL
          Enterprises and now work for them making enhancements to the game, as
          well as work on other gaming projects.
        </p> */}
        <h2 className="text-black dark:text-white mb-4">Get in contact</h2>
        <ul>
          <li>
            {'>  '}
            <a
              href="/"
              target="blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            {'>  '}
            <a
              href="mailto:girishvishnuc98@gmail.com"
              target="blank"
              rel="noopener noreferrer"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </Container>
  )
}

export default about