import PageLayout from "@/components/PageLayout";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export default function Posts() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return (
    <PageLayout title="Blog">
      <div>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <div className="flex flex-row gap-4 items-center">
                <span className="w-[25%] md:w-[20%] lg:w-[15%] text-gray-400 text-sm text-right">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="w-[75%] md:w-[80%] lg:w-[85%] hover:underline"
                >
                  {post.title}
                  {post.tag && (
                    <span className="inline-block bg-amber-200 text-gray-700 px-1 py-1 rounded-sm text-xs font-medium ml-2">
                      #{post.tag}
                    </span>
                  )}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}

export async function generateMetadata() {
  return {
    title: "Blog | Hardik Vala",
  };
}
