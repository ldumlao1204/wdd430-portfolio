import CreateProjectForm from './create-project-form';

export default function CreateProjectPage() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Add a New Project</h1>
            <p className="text-lg text-gray-700 mb-8">Fill in the details below to add a project to my portfolio.</p>
            <CreateProjectForm />
        </section>
    );
}
