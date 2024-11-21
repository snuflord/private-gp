import ArticlesList from "../components/ArticlesList"

export default function AllArticles() {
  return (
    <section className="my-10 md:my-20">
      <h1 className="text-4xl md:text-5xl lg:text-8xl">Articles</h1>
      <ArticlesList />
    </section>
  )
}

