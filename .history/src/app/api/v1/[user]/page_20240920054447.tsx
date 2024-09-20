export default function Page({ params }: { params: { slug: string } }) {
  return <div className="text-white text-4xl">hello {params.slug}</div>
}