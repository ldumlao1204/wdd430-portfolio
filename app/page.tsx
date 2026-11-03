import ProjectList from '@/components/ProjectList';
const projects = [
  {
    title: 'CSE341 Project 2',
    description: 'A REST API for managing students and courses, with GitHub login and Swagger documentation.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Passport', 'Swagger'],
    link: 'https://github.com/ldumlao1204/cse341-project2'
  },
  {
    title: 'World e-Travel Explorer',
    description: 'An API app that fetches and displays country information.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://ldumlao1204.github.io/WDD330-Final-Project/'
  }
];

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I am a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <ProjectList projects={projects} />
    </main>
  );
}