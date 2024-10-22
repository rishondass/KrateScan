
import KrateInfo from "@/components/KrateInfo";

type Props = {
  params:{
    id: string;
  }
}


const Page = async({ params }: { params: { id: string } }) => {
  
}

export default Page;


// const krates = useKrates(state=>state.krates);

//   useEffect(()=>{
    
//   },[krates])

//   if(krates){
//     const krate = krates.find(krate=>krate.id===id);
//     return (
//       <KrateInfo {...krate}/>
//     )
//   }
  

  