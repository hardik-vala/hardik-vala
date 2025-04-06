import { getAllPosts, getPostBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import MarkdownWrapper from "@/components/MarkdownWrapper";

type Params = Promise<{ slug: string }>;

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const subtitle = `${new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} • ${post.readingTimeInMinutes} min. read`;

  return (
    <PageLayout title={post.title} subtitle={subtitle}>
      {/* <ReadingProgress /> */}
      <article className="max-w-none">
        <div className="py-8">
          <MarkdownWrapper>{post.content}</MarkdownWrapper>
        </div>
      </article>
    </PageLayout>
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (post) {
    return {
      title: `${post.title}`,
    };
  }
}

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
