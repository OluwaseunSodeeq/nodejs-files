const posts = [
  { id: 1, title: 'Post One', body: 'This is post one' },
  { id: 2, title: 'Post Two', body: 'This is post two' },
  { id: 3, title: 'Post Three', body: 'This is post three' },]

//   How to export in Es Module
// 1.  export const getPosts = () => posts;

const getPosts = () => posts;
// 2.  export default getPosts;
export {getPosts}
