import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown/with-html";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

// CodeBlock component with language and children support
const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={prism}>
      {value ?? ""}
    </SyntaxHighlighter>
  );
};

export default function Post({ content, frontmatter }) {
  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Header />
      <article className="w-full mx-auto flex-grow max-w-screen-lg py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <ReactMarkdown
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock }} // Use custom code block
        />
      </article>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  // Get data from folder /content
  const files = fs.readdirSync("content");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false, // Return 404 content page not found
  };
}

export async function getStaticProps({ params: { slug } }) {
  // We read from our markdown content page
  const markdownWithMetadata = fs
    .readFileSync(path.join("content", slug + ".md"))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  // Convert post date to format to human readable
  const createdAt = data.createdAt.toISOString();
  const updatedAt = data.updatedAt.toISOString();

  // We replace the createdAt and updatedAt
  const frontmatter = {
    ...data,
    createdAt,
    updatedAt,
  };

  return {
    props: {
      // We manually add title as header before the rest of the content
      content: `# ${data.title}\n${content}`,
      frontmatter,
    },
  };
}
