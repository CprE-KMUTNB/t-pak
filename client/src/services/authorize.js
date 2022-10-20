//เก็บข้อมูล token || username => session storage
export const authenticate=(response,next)=>{
    if(window !=="undefined"){
        //เก็บข้อมูลลง session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.ID))
    }
    next()
}

//ดึงข้อมูล token
export const getToken=()=>{
    if(window !=="undefined")
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
}


//ดังข้อมูล user
export const getUser=()=>{
    if(window !=="undefined")
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false
        }
}

//logout
export const logout=(next)=>{
    if(window !=="undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        }
        next()
}

/*export const getType=()=>{
    if(window !=="undefined")
        if(sessionStorage.getItem("type")){
            return JSON.parse(sessionStorage.getItem("type"))
        }else{
            return false
        }
}*/