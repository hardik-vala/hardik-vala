import Image from "next/image";
import PageLayout from "@/components/PageLayout";

interface Project {
  year: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    year: "Ongoing",
    title: "margin.loans (Sold)",
    description:
      "Online education hub for laymen to learn about margin borrowing.",
    image: "/images/margin-loans.png",
  },
  {
    year: "2024",
    title: "Awesome Judging",
    description:
      "List of judging opportunities to help developers pass the O-1A / EB-1 judging requirement.",
    image: "/images/awesome_judging.png",
    link: "https://github.com/hardik-vala/awesome-judging",
  },
];

export default function Projects() {
  return (
    <PageLayout title="Projects">
      <div className="flex flex-col gap-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-row gap-12 items-start"
          >
            <span className="text-gray-400 text-sm w-[15%] md:w-[10%] lg:w-[5%] text-right">
              {project.year}
            </span>
            <div className="flex flex-col gap-2 w-[85%] md:w-[90%] lg:w-[95%]">
              <div className="flex flex-row gap-2 items-center">
                {project.link ? (
                  <>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md font-semibold hover:underline"
                    >
                      {project.title}
                    </a>
                    <span className="text-xs">↗</span>
                  </>
                ) : (
                  <span className="text-md font-semibold hover:underline">
                    {project.title}
                  </span>
                )}
              </div>
              {project.description && (
                <p className="text-gray-300 text-sm">{project.description}</p>
              )}
              <Image
                src={project.image}
                alt={project.title}
                width={150}
                height={100}
                className="my-2 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}