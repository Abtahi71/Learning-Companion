
import { getAllCompanions } from "@/src/actions/companions.action";
import Card from "@/src/components/card";
import { cards, getSubjectColors } from "@/src/components/cardInfo";
import Searchbar from "@/src/components/searchBar";
import SelectSub from "@/src/components/selectSub";
//import { SearchParams } from "next/dist/server/request/search-params";


interface SearchParams{
  searchParams:Promise<{[key : string]:string | string[] | undefined}>
}



export default async function AllCards({searchParams}:SearchParams) {
    const bgColors = [
      "bg-red-100",
      "bg-blue-100",
      "bg-green-100",
      "bg-yellow-100",
      "bg-purple-100",
      "bg-pink-100",
      "bg-indigo-100",
      "bg-orange-100",
      "bg-teal-100",
      "bg-cyan-100",
    ];

    

    const filter = await searchParams
    const subject = filter?.subject ? filter.subject : ''
    const topic = filter.topic ? filter.topic : ''

    const companions = await getAllCompanions({subject,topic})


    
    

    
 


  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Companion Library</h1>
        <div className="flex gap-4 items-center">
          <Searchbar />
          <SelectSub />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-10">
        {companions.map((card,index)=>{
            return (
                <div key={index}>
                    <Card card={card} style={getSubjectColors(card.subject)} index={index}/>
                </div>
            )
        })}
      </div>
    </div>
  );
}
