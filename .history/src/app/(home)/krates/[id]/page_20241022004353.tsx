import KrateInfo from "@/components/KrateInfo";

type Props = {
  params:{
    id: string;
  }
}




const Page = ({ params }: Props) => {
  const krates = useKrates((state) => state.krates);


}

export default Page;