import PageLayout from "@/components/PageLayout";
import DistributionOverlap from "@/components/the-paradox-of-skill/DistributionOverlap";
import FreethrowSimulation from "@/components/the-paradox-of-skill/FreethrowSimulation";
import MultiPlayerDistribution from "@/components/the-paradox-of-skill/MultiPlayerDistribution";
import SinglePlayerDistribution from "@/components/the-paradox-of-skill/SinglePlayerDistribution";
import SkillvsLuckSimulation from "@/components/the-paradox-of-skill/SkillvsLuckSimulation";
import { calculateReadingTimeInMinutes } from "@/lib/utils";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { notFound } from "next/navigation";

const mdxComponents = {
  SinglePlayerDistribution,
  MultiPlayerDistribution,
  FreethrowSimulation,
  SkillvsLuckSimulation,
  DistributionOverlap,
};

type Params = Promise<{ slug: string }>;

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post || !post.body.code) {
    notFound();
  }

  const readingTimeInMinutes = calculateReadingTimeInMinutes(post.body.code);

  const subtitle = `${new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} • ${readingTimeInMinutes} min. read`;

  return (
    <PageLayout title={post.title} subtitle={subtitle}>
      {/* <ReadingProgress /> */}
      <article className="max-w-none">
        <div className="py-8 prose">
          <MDXContent code={post.body.code} />
        </div>
      </article>
    </PageLayout>
  );
}

// Cannot call useMDXComponent in an async function.
function MDXContent({ code }: { code: string }) {
  const MDXComponent = useMDXComponent(code);
  return <MDXComponent components={mdxComponents} />;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  const description =
    post?.description ||
    "hardik vala: technical founder (yc s23, ex-google, ex-apple)";

  if (post) {
    return {
      title: `${post.title}`,
      description: description,
      openGraph: {
        title: post.title,
        description,
        siteName: "hardik vala",
        images: [
          {
            url: post.image,
            alt: post.alt || post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        creator: "@TheHardikVala",
        images: [
          {
            url: post.image,
            alt: post.alt || post.title,
          },
        ],
      },
    };
  }
}

// Generate static params for SSG
export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}
