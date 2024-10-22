"use client"
import KrateInfo from "@/components/KrateInfo";
import {useKrates} from "@/lib/globalStates";
import {useState,useEffect} from "react";




const Page = ({ params }: { params: { id: string } }) => {
  const krates = useKrates((state) => state.krates);
  const [krate, setKrate] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Check if krates are already in state
    if (krates.length !== 0) {
      const foundKrate = krates.find((krate) => krate.id === params.id);
      if (foundKrate) {
        setKrate(foundKrate);
        setLoading(false);
      }
    } else {
      // If krates are not in state, fetch the specific krate
      const fetchKrate = async () => {
        try {
          const res = await fetch(`/api/v1/krate/${params.id}`);
          const data = await res.json();
          setKrate(data); // Update state with fetched krate
        } catch (error) {
          console.error('Error fetching krate:', error);
        } finally {
          setLoading(false); // Stop loading once data is fetched
        }
      };

      fetchKrate(); // Call the fetch function
    }
  }, [krates, params.id]);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the krate info if found, otherwise show an error message
  return krate ? <KrateInfo {...krate} /> : <div>Krate not found</div>;
}

export default Page;