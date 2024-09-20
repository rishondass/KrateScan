export default function Page({ params }: { params: { slug: string } }) {
  return <div class>{params.slug}</div>
}