import fs from "fs";
import Link from "next/link";
import matter from "gray-matter";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ posts }) {
  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header />
      <div className="flex-grow max-w-screen-lg mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        {posts.map(
          ({ frontmatter: { title, description, createdAt }, slug }) => (
            <Link href={"/p/[slug]"} as={`/p/${slug}`}>
              <a className="no-underline text-black">
                <article key={slug}>
                  <header>
                    <h3 className="mb-2">
                      <h1 className="text-3xl font-semibold text-gray-800 no-underline">
                        {title}
                      </h1>
                    </h3>
                    <span className="mb-4 text-xs">{createdAt}</span>
                  </header>
                  <section>
                    <p className="mb-8">{description}</p>
                  </section>
                </article>
              </a>
            </Link>
          ),
        )}
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  // Get data from folder /content
  const files = fs.readdirSync(`${process.cwd()}/content`);

  // We obtain the information from each file independently and map it
  // to object array
  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`content/${filename}`)
      .toString();

    const { data } = matter(markdownWithMetadata);

    // Convert post date to format to human readable
    const options = { year: "numeric", month: "long", day: "numeric" };
    const createdAt = data.createdAt.toLocaleDateString("en-US", options);
    const updatedAt = data.createdAt.toLocaleDateString("en-US", options);

    // We replace the createdAt and updatedAt
    const frontmatter = {
      ...data,
      createdAt,
      updatedAt,
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
