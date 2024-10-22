import KrateInfo from "@/components/KrateInfo";

type Props = {
  params;
}




const Page = ({ params }: { params: { id: string } }) => {
  const krates = useKrates((state) => state.krates);


}

export default Page;