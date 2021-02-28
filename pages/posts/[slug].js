import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import { useRouter } from 'next/router'
import utilStyles from '../../styles/utils.module.css';

export default function Post({postData}) {
  const {t} = useTranslation();
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const data = postData[0];
  return (
    <Layout>
      <Head>
        <title>{data.title.rendered}</title>
      </Head>
      <p>{t('description')}</p>
      <article>
        <h1 className={utilStyles.headingXl}>{data.title.rendered}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={data.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps({params, locale}) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData: postData,
      ...await serverSideTranslations(locale, ['common']),
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  // const paths = getAllPostIds();
  return {
    paths: [],
    fallback: true,
  };
}