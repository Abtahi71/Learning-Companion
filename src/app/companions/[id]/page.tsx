// import Image from "next/image";
// import { cards, getSubjectColors } from "@/src/components/cardInfo";
// import { getCompanion } from "@/src/actions/companions.action";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import CompanionComponent from "@/src/components/CompanionComponent";


// interface Props{
//   params:Promise<{id:string}>
// }

// export default async function Session({params}:Props){
//   const{ id }= await params
//   const companion = await getCompanion(id)
//   const user = await currentUser()

//   if(!user)redirect('/sign-in')
//   if(!companion)redirect('/companions')

  
//     return (
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between border-2 border-black rounded-lg p-3">
//           <div className="flex items-center gap-4">
//             <Image
//               src={`/${companion.subject}.svg`}
//               alt="image"
//               width={50}
//               height={50}
//               className="p-2 rounded-lg"
//               style={{backgroundColor:getSubjectColors(companion.subject)}}
//             />
//             <div>
//               <h1 className="text-xl font-bold">{companion.name}</h1>
//               <h2 className="text-gray-700">Topic: {companion.topic}</h2>
//             </div>
//           </div>
//           <div className="text-xl">
//             {companion.duration} mins
//           </div>
//         </div>


//         <CompanionComponent {...companion} companionId={id} userName={user.firstName!} userImage={user.imageUrl!}/>
//       </div>
//     );
// }

import Image from "next/image";
import { cards, getSubjectColors } from "@/src/components/cardInfo";
import { getCompanion } from "@/src/actions/companions.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CompanionComponent from "@/src/components/CompanionComponent";
import { Clock, BookOpen } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Session({ params }: Props) {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!companion) redirect("/companions");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 p-4 sm:p-5 mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl shadow-sm ring-1 ring-black/5"
                style={{ backgroundColor: getSubjectColors(companion.subject) }}
              >
                <Image
                  src={`/${companion.subject}.svg`}
                  alt={companion.subject}
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {companion.name}
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5 text-sm text-slate-500">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px] sm:max-w-none">
                    {companion.topic}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-100/80 rounded-xl px-4 py-2.5 border border-slate-200/60">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-700">
                {companion.duration}
              </span>
              <span className="text-xs text-slate-500">mins</span>
            </div>
          </div>
        </div>

        <CompanionComponent
          {...companion}
          companionId={id}
          userName={user.firstName!}
          userImage={user.imageUrl!}
        />
      </div>
    </div>
  );
}