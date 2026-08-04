import CorpDetailPage from "../../../components/CorpDetailPage";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <CorpDetailPage slug={slug} />;
}
