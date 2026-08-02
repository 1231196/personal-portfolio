import { Link } from 'react-router-dom'
import blogPosts from '../data/blogPosts'

function BlogList() {
  return (
    <section className="terminal-wrap blog-block blog-page">
      <p className="prompt-line">root@rfaria: /blog $ ls</p>
      <h2 className="timeline-title">blog</h2>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
            <p className="blog-card-date">{post.date}</p>
            <h3>{post.title}</h3>
            <p className="blog-card-excerpt">{post.excerpt}</p>
            <div className="blog-card-tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="blog-card-link">read_more &gt;</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default BlogList
