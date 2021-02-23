import Head from 'next/head'
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import {getSortedPostsData} from '../lib/posts';
import utilStyles from '../styles/utils.module.css'
import WPAPI from 'wpapi';


// const wp = new WPAPI({endpoint: 'https://bachhoaso.vn/wp-json'});
const wp = new WPAPI({endpoint: 'https://todayilearn45214567.wordpress.com/wp-json'});

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
    revalidate: 10,
  }
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm <b>Minh</b>. I'm a software engineer blah blah blah</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, slug, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${slug}`}>
                <a>{title.rendered}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
