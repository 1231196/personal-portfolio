import { Link, Navigate, useParams } from 'react-router-dom'
import { getPostBySlug } from '../data/blogPosts'

function renderBlock(block, index) {
  switch (block.type) {
    case 'h2':
      return <h2 key={index} className="blog-type-line">{block.text}</h2>
    case 'h3':
      return <h3 key={index} className="blog-type-line">{block.text}</h3>
    case 'ul':
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item} className="blog-type-line">{item}</li>
          ))}
        </ul>
      )
    case 'pre':
      return (
        <pre key={index}>
          <code className="blog-type-line">{block.text}</code>
        </pre>
      )
    default:
      return <p key={index} className="blog-type-line">{block.text}</p>
  }
}

function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="terminal-wrap blog-post-block">
      <p className="prompt-line">root@rfaria: /blog $ cat {post.slug}.md</p>

      <Link to="/blog" className="blog-back-link">&lt; back_to_blog</Link>

      <article className="blog-post">
        <header className="blog-post-header">
          <p className="blog-card-date">{post.date}</p>
          <h1>{post.title}</h1>
          <div className="blog-card-tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className="blog-post-content">
          {post.content.map((block, index) => renderBlock(block, index))}
        </div>
      </article>
    </section>
  )
}

export default BlogPost
