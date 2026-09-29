// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import Image from 'next/image';
// import React from 'react'
// import { cards, getSubjectColors } from "@/src/components/cardInfo";
// import { users } from "@/src/components/cardInfo";
// import { getRecentUserSessions, getUserCompanion } from '@/src/actions/companions.action';
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { redirect } from 'next/navigation';
// import { Check, CheckCircle, GraduationCap } from 'lucide-react';
// import RecentSessions from '@/src/components/myrecentsessions';
// import MyCompanion from '@/src/components/mycompanions';

// export default async function Myjourney(){
//   const recentUserSessions = await getRecentUserSessions()
//   const userCompanions = await getUserCompanion() 
//   const user = await currentUser();
//   if(!user)redirect('/')
//   const name = user.firstName
//   const image = user.imageUrl
//   const email = user?.emailAddresses[0].emailAddress
//   //console.log(user)

//     return (
//       <div className="max-w-7xl mx-auto mt-10">
//         <div>
//           <div className="flex justify-between">
//             <div className="flex gap-2 items-center">
//               <div className="w-15 h-15 bg-green-600 flex items-center justify-center text-white text-5xl font-bold rounded-lg">
//                 {name![0]}
//               </div>
//               <div>
//                 <p className="text-2xl">{name}</p>
//                 <p className="text-gray-600">{email}</p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="border-2 border-black rounded-lg p-3">
//                 <p className="text-3xl flex items-center gap-2">
//                   <span>
//                     <CheckCircle className="text-orange-400" />
//                   </span>
//                   {recentUserSessions.length}
//                 </p>
//                 <p className="text-md">Lessons completed</p>
//               </div>
//               <div className="border-2 border-black rounded-lg p-3">
//                 <p className="text-3xl flex items-center gap-2">
//                   <span>
//                     <GraduationCap className="text-orange-400" />
//                   </span>
//                   {userCompanions.length}
//                 </p>
//                 <p className="text-md">Companions Created</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div>
//           <RecentSessions recentUserSessions={recentUserSessions}/> 
//         </div>
//         <div>
//           <MyCompanion companion={userCompanions}/>
//         </div>
//       </div>
//     );
// }

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import { cards, getSubjectColors } from "@/src/components/cardInfo";
import { users } from "@/src/components/cardInfo";
import {
  getRecentUserSessions,
  getUserCompanion,
} from "@/src/actions/companions.action";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Check, CheckCircle, GraduationCap } from "lucide-react";
import RecentSessions from "@/src/components/myrecentsessions";
import MyCompanion from "@/src/components/mycompanions";

export default async function Myjourney() {
  const recentUserSessions = await getRecentUserSessions();
  const userCompanions = await getUserCompanion();
  const user = await currentUser();
  if (!user) redirect("/");

  const name = user.firstName;
  const image = user.imageUrl;
  const email = user?.emailAddresses[0].emailAddress;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative">
                {image ? (
                  <Image
                    src={image}
                    alt={name || "User"}
                    width={72}
                    height={72}
                    className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl object-cover ring-4 ring-white shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                    {name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {name}
                </h1>
                <p className="text-sm sm:text-base text-slate-500 mt-0.5 truncate">
                  {email}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-1 sm:flex-none bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 sm:p-5 border border-orange-100/80 shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-orange-100 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
                    Lessons
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {recentUserSessions.length}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Completed</p>
              </div>

              <div className="flex-1 sm:flex-none bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 sm:p-5 border border-indigo-100/80 shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-indigo-100 rounded-lg">
                    <GraduationCap className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
                    Companions
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {userCompanions.length}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Created</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
            <RecentSessions recentUserSessions={recentUserSessions} />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
            <MyCompanion companion={userCompanions} />
          </div>
        </div>
      </div>
    </div>
  );
}