export const validURLConverter=(name)=>{
     return name?.toString()?.replaceAll(" ","-")?.replaceAll(",","-")?.replaceAll("&","-")
} 