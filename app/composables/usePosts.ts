export const usePosts = () => {
  const fetchPosts = async () => {
    const posts = await queryCollection('posts').all()
    // TODO handle references to other collection in schema generation
    for (const post of posts) {
      if (!post.authors || !Array.isArray(post.authors) || post.authors.length === 0) {
        continue
      }

      const authors = await Promise.all(post.authors.map((author) => {
        return queryCollection('authors').where('slug', '=', author).first()
      }))

      if (authors) {
        post.authors = authors
      }
    }

    return posts
  }

  return {
    fetchPosts
  }
}
