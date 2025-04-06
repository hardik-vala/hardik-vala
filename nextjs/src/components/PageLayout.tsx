interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function Layout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <div className="flex flex-col gap-10 pb-20">
      {subtitle ? (
        <div>
          <h1 className="text-3xl font-medium text-center my-8">{title}</h1>
          <div className="text-sm text-gray-500 tracking-tight text-center">
            {subtitle}
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-medium text-center my-8">{title}</h1>
      )}
      <div>{children}</div>
    </div>
  );
}
