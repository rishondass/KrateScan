
import KrateInfo from "@/components/KrateInfo";





const Page = ({ params }: { params: { id: string } }) => {
  const krates = useKrates((state) => state.krates);
  const [krate, setKrate] = useState(null);
  const [loading, setLoading] = useState(true); 


}

export default Page;