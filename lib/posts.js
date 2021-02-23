
import path from 'path'

import WPAPI from 'wpapi';
// const wp = new WPAPI({endpoint: 'https://apsafety.net/wp-json'});
const wp = new WPAPI({endpoint: 'https://bachhoaso.vn/wp-json'});

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData() {
  // const response = await axios.get('https://bachhoaso.vn/wp-json/wp/v2/posts');
  const response = await wp.posts();
  return response;
}

export function getAllPostIds() {
  // const fileNames =  fs.readdirSync(postsDirectory)
  const fileNames = [ 'pre-rendering.md', 'ssg-ssr.md'];
  
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
export async function getPostData(slug) {
  const posts =  await wp.posts().slug(slug);
  return posts;
}