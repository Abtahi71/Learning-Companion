"use client"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "../utils/formUrlQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Searchbar(){
    const [localTerm,setLocalTerm]=useState("")
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(()=>{
        const delayDebounce = setTimeout(()=>{
            if(localTerm){
            const newurl = formUrlQuery({
                params:searchParams.toString(),
                key:'topic',
                value:localTerm
            })
            router.push(newurl,{scroll:false})
            }else{
                if(pathname === '/companions'){
                    console.log('I HAVE COME TO THE ELSE BLOCK ')
                    const newUrl = removeKeysFromUrlQuery({
                    params:searchParams.toString(),
                    keysToRemove:['topic']
                })
                router.push(newUrl,{scroll:false})
            }
            }
        },500)

        return ()=> clearTimeout(delayDebounce)

    },[localTerm])
    return (
      <div className="p-2 border-black border-2 rounded-lg w-75 flex items-center">
        <Input
          placeholder="Search for your companions..."
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Search />
      </div>
    );
}