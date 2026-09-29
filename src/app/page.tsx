import Image from "next/image";
import {cards, getSubjectColors} from "@/src/components/cardInfo"
import Card from "../components/card";
import { createClient } from '@/src/utils/supabase/server'
import { cookies } from 'next/headers'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCompanions, getRecentSessions, getRecentUserSessions } from "../actions/companions.action";
import Link from "next/link";

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

export default async function Home() {

  const cookieStore = await cookies()
  //const supabase = createClient(cookieStore)

  //const { data: todos } = await supabase.from('todos').select()

  const companions = await getAllCompanions({limit:3})
  const RecentSession = await getRecentSessions()

  //console.log('COMPANIONS',companions)
  //console.log('RECENT USER SESSIONS',RecentUserSession)

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div>
        <h1 className="font-medium text-4xl mb-5">Dashboard</h1>
        <div className="flex gap-4">
          {companions.slice(0, 3).map((card, index) => {
            return (
              <div key={card.id}>
                <Card
                  card={card}
                  style={getSubjectColors(card.subject)}
                  index={index}
                />
              </div>
            );
          })}
        </div>
        <div></div>
      </div>

      <div className="flex gap-4 mt-10">
        <div className="border border-black p-4 rounded-lg">
          <h1>Recently Completed Lessons</h1>
          <Table className="w-175 border-separate border-spacing-x-4">
            <TableHeader>
              <TableRow>
                <TableHead>Lessons</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RecentSession.map((card: any) => (
                <TableRow key={card.Companions.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={`/${card.Companions.subject}.svg`}
                        alt="image"
                        width={50}
                        height={50}
                        className=""
                      />
                      <div>
                        <h1 className="text-xl font-bold">
                          {card.Companions.name}
                        </h1>
                        <h2 className="text-gray-700">
                          Topic: {card.Companions.topic}
                        </h2>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-white bg-black px-1 py-1 rounded-xl text-center  ">
                      {card.Companions.subject}
                    </div>
                  </TableCell>
                  <TableCell>{card.Companions.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-6 items-center text-white bg-[#1e1e1e] h-[500px] rounded-lg p-6">
          <h1 className="bg-yellow-300 py-2 px-3 rounded-lg text-black text-xs">
            Start learning your way
          </h1>
          <h1 className="text-4xl font-bold">
            Build a personalised <br /> learning experience
          </h1>
          <h1>
            Pick a name,subject,voice and personality <br /> -- and start
            learning through <br /> voice conversations that feel natural and
            fun
          </h1>
          <Image
            src="/image-removebg-preview.png"
            width={220}
            height={220}
            alt="logo"
          />
          <Link href={`/new`}>
            <button className="bg-orange-400 rounded-lg py-2 px-2 mb-2 w-full">
              Build new Companion
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
