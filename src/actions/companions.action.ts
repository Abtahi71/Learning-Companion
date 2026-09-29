'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../utils/supabase/supabase"

interface CreateCompanion {
  name: string
  subject: string
  topic: string
  voice: string
  style: string
  duration: number;
}

interface GetAllCompanions {
  limit?: number;
  page?: number;
  subject?: string | string[];
  topic?: string | string[];
}

export const createCompanion = async(formData:CreateCompanion)=>{
    const { userId: author } = await auth()
    const supabase = createSupabaseClient()
    
    const {data,error} = await supabase
    .from('Companions')
    .insert({...formData,author})
    .select()

    if(error || !data)throw new Error(error?.message || 'Failed to fetch data')

    return data[0]
}

export const getAllCompanions = async({page=1,limit=10,subject,topic}:GetAllCompanions)=>{
    const supabase = createSupabaseClient()

    console.log(topic)

    let query = supabase.from('Companions').select()
    if(subject && topic){
        query = query.ilike('subject',`%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }else if(subject){
        query = query.ilike("subject", `%${subject}%`);
    }else if(topic){
        query = query.or(`topic.ilike.%${topic},name.ilike.%${topic}%`)
    }

    query = query.range((page-1)*limit,page*limit-1)
    const {data,error} = await query
    if(error || !data)throw new Error('Could not fetch data')
        console.log(data)
    return data
}

export const getCompanion = async(id:string)=>{
    const supabase = createSupabaseClient()
    const {data,error} = await supabase
    .from('Companions')
    .select()
    .eq('id',id)

    if(error)throw new Error('Could not fetch')
        return data[0]
}

export const addToSessionHistory = async(companionId:string)=>{
    const supabase = createSupabaseClient()
    const {userId} = await auth()
    const {data,error} = await supabase
    .from('Session_history')
    .insert({
        'companion_id':companionId,
        'userId':userId
    })
    .select()

    if(error)throw new Error(error.message)
    return data
}

export const getRecentSessions = async(limit=10)=>{
    const supabase = createSupabaseClient()
    const {userId} = await auth()
    const {data,error} = await supabase
    .from('Session_history')
    .select(`Companions:companion_id (*)`)
    .order('created_at',{ascending:false})
    .limit(limit)

    if(error || !data)throw new Error('No data found')
    return data
}
export const getRecentUserSessions = async(limit=10)=>{
    const supabase = createSupabaseClient()
    const {userId} = await auth()
    const {data,error} = await supabase
    .from('Session_history')
    .select(`Companions:companion_id (*)`)
    .eq('userId',userId)
    .order('created_at',{ascending:false})
    .limit(limit)

    if(error || !data)throw new Error('No data found')
    return data
}
export const getUserCompanion = async()=>{
    const {userId} = await auth()
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from("Companions")
      .select()
      .eq("author", userId);
      
    if(error)throw new Error(error.message)

    return data
    
}