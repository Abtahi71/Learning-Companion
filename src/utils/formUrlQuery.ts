import qs from "query-string"

export const formUrlQuery = ({params,key,value}:any)=>{
    const queryString = qs.parse(params)

    queryString[key] = value

    return qs.stringifyUrl({
        url:window.location.pathname,
        query:queryString
    })
}

export const removeKeysFromUrlQuery = ({params,keysToRemove}:any)=>{
    const queryString = qs.parse(params)

    console.log('THIS IS THE QUERY IN THE REMOVE FUNCTION',queryString)
    console.log('THIS IS THE KEYS IN THE REMOVE FUNCTION',keysToRemove)

    if(keysToRemove)
    {keysToRemove.map((key:any)=>(
        delete queryString[key]
    ))}

    return qs.stringifyUrl({
        url:window.location.pathname,
        query:queryString
    })
     
}