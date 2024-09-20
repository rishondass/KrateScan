
export default function Page({ params }: { params: { user: string } }) {
  return <div className="text-white text-4xl">hello {params.user}</div>
}