import ProjectDetailPage from "../../../components/ProjectDetailPage";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <ProjectDetailPage kind="tvc" slug={slug} />;
}
