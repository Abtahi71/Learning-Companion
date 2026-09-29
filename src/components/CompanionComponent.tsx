'use client'
import { useEffect, useRef, useState } from "react"
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import { vapi } from "../utils/vapi.sdk";
import { configureAssistant } from "../utils/utils";
import Image from "next/image";
import { cn } from "@/lib/utils";
import soundwaves from "@/src/utils/soundwaves.json"
import { getSubjectColors } from "./cardInfo";
import { addToSessionHistory } from "../actions/companions.action";

export enum CallStatus{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED'

}

interface SavedMessage{
    role:'user' | "system" | "assistant",
    content:string
}

interface CompanionComponentProps{
    companionId:string,
    subject:string,
    topic:string,
    name:string,
    userName:string,
    userImage:string,
    style:string,
    voice:string
}
export default function CompanionComponent({companionId, subject, topic, name, userName, userImage, style, voice}:CompanionComponentProps ){
        const [callStatus,setCallStatus]=useState<CallStatus>(CallStatus.INACTIVE)
        const [isSpeaking,setIsSpeaking]=useState(false)
        const [isMuted,setIsMuted] = useState(false)
        const [messages,setMessages] = useState<SavedMessage[]>([])

        const lottieref = useRef<LottieRefCurrentProps>(null)

        useEffect(()=>{
            if(lottieref){
                if(isSpeaking){
                    lottieref.current?.play()
                }else{
                    lottieref.current?.stop()
                }
            }
        },[isSpeaking,lottieref])

        useEffect(()=>{
            const onCallStart = ()=>setCallStatus(CallStatus.ACTIVE)
            const onCallEnd = ()=>{
              setCallStatus(CallStatus.FINISHED)
              addToSessionHistory(companionId)
            }
            const onSpeechStart = ()=>setIsSpeaking(true)
            const onSpeechEnd = ()=>setIsSpeaking(false)
            const onMessage = (message:any)=>{
                if(message.type==='transcript' && message.transcriptType==='final'){
                    const newMessage = {role:message.role,content:message.transcript}
                    setMessages((prev)=>[...prev,newMessage])
                }
            }

            const onError = (error: Error)=>console.log('Error',error)

            vapi.on('call-start',onCallStart)
            vapi.on('call-end',onCallEnd)
            vapi.on('message',onMessage)
            vapi.on('speech-start',onSpeechStart)
            vapi.on('speech-end',onSpeechEnd)
            vapi.on('error',onError)

            return ()=>{
                vapi.off('call-start',onCallStart)
                vapi.off('call-end',onCallEnd)
                vapi.off('message',onMessage)
                vapi.off('speech-start',onSpeechStart)
                vapi.off('speech-end',onSpeechEnd)
                vapi.off('error',onError)    

            }
            },[])

    const toggleMicrophone = ()=>{
        const isMuted = vapi.isMuted()
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }

    const handleCall = async()=>{
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues : {subject,topic,style},
            clientMessages:['transcript'],
            serverMessages:[]
        }
        //@ts-expect-error
        vapi.start(configureAssistant(voice,style),assistantOverrides)

    }

    const handleDisconnect = async()=>{
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
      <section className="flex flex-col h-[70vh]">
        <section className="flex gap-8 max-sm:flex-col">
          <div className="companion-section w-2/3 mt-10 flex flex-col justify-center items-center border-2 border-black rounded-lg">
            <div className="companion-avatar">
              <div
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-xl overflow-hidden transition-opacity duration-1000",
                  callStatus === CallStatus.FINISHED ||
                    callStatus === CallStatus.INACTIVE
                    ? "opacity-100"
                    : "opacity-0",
                  callStatus === CallStatus.CONNECTING &&
                    "opacity-100 animate-pulse"
                )}
              >
                <Image
                  src={`/${subject}.svg`}
                  alt={subject}
                  width={150}
                  height={150}
                  style={{ backgroundColor: getSubjectColors(subject) }}
                  className="p-4 rounded-lg mb-6"
                />
                <p className="font-bold text-2xl">{name}</p>
              </div>

              <div
                className={cn(
                  "absolute transition-opacity duration-1000",
                  callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
                )}
              >
                <Lottie
                  lottieRef={lottieref}
                  animationData={soundwaves}
                  autoplay={false}
                  className="size-25 ml-10"
                />
              </div>
            </div>
          </div>

          <div className="user-section ">
            <div className="user-avatar flex flex-col items-center justify-center p-10 border-2 border-black rounded-lg m-10">
              <Image
                src={userImage}
                alt={userName}
                width={130}
                height={130}
                className="rounded-lg"
              />
              <p className="font-bold text-2xl">{userName}</p>
            </div>
            <div className="flex gap-3">
              <button
                className="btn-mic flex flex-col items-center justify-center border-2 border-black rounded-lg p-4 w-1/2"
                onClick={toggleMicrophone}
                disabled={callStatus !== CallStatus.ACTIVE}
              >
                <Image
                  src={isMuted ? "/mic-off.svg" : "/mic-on.svg"}
                  alt="mic"
                  width={36}
                  height={36}
                />
                <p className="max-sm:hidden">
                  {isMuted ? "Turn on mic" : "Turn off mic"}
                </p>
              </button>
              <button
                className={cn(
                  "rounded-lg py-2 cursor-pointer transition-colors w-1/2 text-white",
                  callStatus === CallStatus.ACTIVE
                    ? "bg-red-700"
                    : "bg-primary",
                  callStatus === CallStatus.CONNECTING && "animate-pulse"
                )}
                onClick={
                  callStatus === CallStatus.ACTIVE
                    ? handleDisconnect
                    : handleCall
                }
              >
                {callStatus === CallStatus.ACTIVE
                  ? "End Session"
                  : callStatus === CallStatus.CONNECTING
                  ? "Connecting"
                  : "Start Session"}
              </button>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col gap-4 w-full items-center pt-10 flex-grow overflow-hidden;">
          <div className="overflow-y-auto w-full flex flex-col gap-4 max-sm:gap-2 pr-2 h-full text-2xl no-scrollbar mb-5">
            {messages.slice(-1).map((message, index) => {
              if (message.role === "assistant") {
                return (
                  <p key={index} className="max-sm:text-sm">
                    {name.split(" ")[0].replace("/[.,]/g, ", "")}:{" "}
                    {message.content}
                  </p>
                );
              } else {
                return (
                  <p key={index} className="text-primary max-sm:text-sm">
                    {userName}: {message.content}
                  </p>
                );
              }
            })}
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 max-sm:h-20 bg-gradient-to-t from-background via-background/90 to-transparent z-10;" />
        
        </section>
      </section>
    );
}