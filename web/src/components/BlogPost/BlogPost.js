import { Link, routes } from '@redwoodjs/router'

const BlogPost = ({ post }) => {
  return (
    <div>
      <article key={post.id}>
        <header>
          <h2>
            <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
          </h2>
        </header>
        <p>{post.body}</p>
        <div>
          Posted at: <time>{post.createdAt}</time>
        </div>
      </article>
    </div>
  )
}

export default BlogPost
