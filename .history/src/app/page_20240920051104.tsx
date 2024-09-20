import Image from "next/image";

export default function Home() {
  return (
  <div className="bg-prim text-white flex items-center flex-col justify-center h-screen gap-3">
    <div className="text-4xl font-extrabold"><span className="text-sec">Krate</span> <span>Scan</span></div>
    <input type="text" placeholder="username" className="px- max-w-96 rounded-md" />
  </div>
  );
}
