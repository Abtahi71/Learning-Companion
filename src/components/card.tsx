import {Bookmark} from "lucide-react"
import Link from "next/link";

export default function Card({card,style,index}:{card:any,style:string,index:any}){
  console.log('STYLE IS THIS',style)
    return (
      <div
        className={`flex flex-col justify-between border-black border-2 gap-5 border border-b rounded-3xl p-4 w-[400px] h-[350px]`}
        style={{ backgroundColor: style }}
      >
        <div className="flex justify-between items-center">
          <div className="bg-black text-white px-3 py-2 rounded-xl">
            {card.subject}
          </div>

          <div className="bg-black text-white p-2 rounded-xl">
            <Bookmark />
          </div>
        </div>

        <div>
          <h1 className="font-bold text-4xl">{card.name}</h1>

          <h2 className="mt-5 text-gray-600 text-lg">Topic: {card.topic}</h2>

          <h3 className="mt-4">Duration: {card.duration} mins</h3>
        </div>
        <Link href={`/companions/${card.id}`}>
          <button className="bg-orange-400 py-2 rounded-lg font-medium text-lg w-full hover:cursor-pointer">
            Launch Lesson
          </button>
        </Link>
      </div>
    );

}