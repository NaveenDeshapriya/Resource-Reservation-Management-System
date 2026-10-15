
export const isEmail=(email:string):boolean=>{

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        return true;
        
    }else{
        return false;
    }


}


export const isNumber=(data:string):boolean=>{

    const numberRegex: RegExp =  /^[0-9]+$/;

    if (numberRegex.test(data)) {
        return true;
        
    }else{
        return false;
    }


}


