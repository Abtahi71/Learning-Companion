"use client"
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { formUrlQuery, removeKeysFromUrlQuery } from "../utils/formUrlQuery"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function SelectSub(){
    const [isOpen,setIsOpen]=useState(false)
    const [selected,setSelected]=useState("")
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(()=>{
      const delayDebounce = setTimeout(()=>{
        if(selected){
          const newUrl = formUrlQuery({
            params:searchParams.toString(),
            key:'subject',
            value:selected
          })
          router.push(newUrl,{scroll:false})
        }else {
          if(pathname === '/companions'){
            const newUrl = removeKeysFromUrlQuery({
              params:searchParams.toString(),
              keysToRemove:['subject']
            })
            router.push(newUrl,{scroll:false})
          }
        }
        return ()=>clearTimeout(delayDebounce)


      },500)
    },[selected])
    return (
      <div className="relative bg-white">
        <div
          className="flex items-center text-sm text-gray-400  border-black border-2 rounded-lg px-3 py-3 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>Select subject</p>
          <ChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        <div
          className={`absolute top-15 z-10 bg-white border-black border p-2 rounded-lg ${
            isOpen ? "" : "hidden"
          }`}
        >
          <p
            className="border-b border-gray-300 w-[90px] cursor-pointer"
            onClick={() => setSelected("")}
          >
            All
          </p>
          <p
            className="border-b border-gray-300 w-[90px] cursor-pointer"
            onClick={() => setSelected("Science")}
          >
            Science
          </p>
          <p
            className="border-b border-gray-300 w-[90px] cursor-pointer"
            onClick={() => setSelected("Maths")}
          >
            Maths
          </p>
          <p
            className="border-b border-gray-300 w-[90px] cursor-pointer"
            onClick={() => setSelected("Language")}
          >
            Language
          </p>
          <p
            className="border-b border-gray-300 w-[90px] cursor-pointer"
            onClick={() => setSelected("History")}
          >
            History
          </p>
          <p
            className=" w-[90px] cursor-pointer"
            onClick={() => setSelected("coding")}
          >
            Coding
          </p>
        </div>
      </div>
    );
}