export const verifyForm = (...fields) =>{
    return fields.every(field=>{
        if(!field){
            return false;
        }
        return true;
    })
}