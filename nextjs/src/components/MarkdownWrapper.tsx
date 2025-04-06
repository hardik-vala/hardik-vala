import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function MarkdownWrapper({ children }: { children: string }) {
  const components = {};

  return (
    <div
      className="
      [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-center [&>h1]:my-8 [&>h1]:font-literata
      [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:py-4 [&>h2]:mb-4 [&>h2]:font-literata
      [&>h3]:text-xl [&>h3]:font-bold [&>h3]:py-2 [&>h3]:mb-4 [&>h3]:font-literata
      [&>h4]:text-lg [&>h4]:font-bold [&>h4]:py-1 [&>h4]:mb-4 [&>h4]:font-literata
      [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:font-light [&>p>strong]:font-bold
      [&>em>strong]:font-bold
      [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4
      [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>ol]:space-y-2
      [&>li>a]:underline
      [&>p>a]:underline
      [&>blockquote]:border-l-4 [&>blockquote]:border-gray-500 
      [&>blockquote]:px-4 [&>blockquote]:py-2 [&>blockquote]:my-2
      [&>blockquote]:italic [&>blockquote]:text-gray-400
      [&>hr]:my-8
      tracking-tight
    "
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}