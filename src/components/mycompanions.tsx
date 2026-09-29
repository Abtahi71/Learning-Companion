"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getSubjectColors } from "./cardInfo";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function MyCompanion({ companion }: any) {
     const [open, setOpen] = useState(false);
     const toggleOpen = () => {
       setOpen(!open);
     };

    console.log('THIS IS THE COMAPNION',companion)
  return (
    <div className="border border-black p-4 rounded-lg mt-10 mb-10" onClick={toggleOpen}>
      <h1 className="ml-6 text-xl flex gap-4 items-center">
        My Companions
        <span className="hover:cursor-pointer">
          <ChevronDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </h1>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <Table className="border-separate border-spacing-x-4">
          <TableHeader>
            <TableRow>
              <TableHead>Lessons</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companion.map((card: any) => (
              <TableRow key={card.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Image
                      src={`/${card.subject}.svg`}
                      alt="image"
                      width={50}
                      height={50}
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: getSubjectColors(card.subject),
                      }}
                    />
                    <div>
                      <h1 className="text-xl font-bold">{card.name}</h1>
                      <h2 className="text-gray-700">Topic: {card.topic}</h2>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-white bg-black px-1 py-1 rounded-xl text-center  ">
                    {card.subject}
                  </div>
                </TableCell>
                <TableCell>{card.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
