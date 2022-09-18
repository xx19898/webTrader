import { json } from "stream/consumers";



  export function removeWhitespaceFromKeys(oldJsonObject: Object) : void {
    //Base case: there is only one key, which only has one value behind it
    if(Object.keys(oldJsonObject).length == 1 && (oldJsonObject[Object.keys(oldJsonObject)[0] as keyof typeof oldJsonObject].length <= 1)){
        const origKey = (Object.keys(oldJsonObject)[0] as keyof typeof oldJsonObject);
        const newKey = (Object.keys(oldJsonObject)[0] as keyof typeof oldJsonObject).replace(/\s/g, '_');
        if(!(origKey === newKey)){ 
        const theValueOfOrigKey = oldJsonObject[origKey];
        Object.assign(oldJsonObject,{[newKey]:theValueOfOrigKey});
        delete oldJsonObject[origKey];
        }
    }
    //Get keys
    //Iterate through key,
    //remove empty  space with regex, 
    //put new modified keys with the according values
    else{
    Object.keys(oldJsonObject).forEach( key => {
        console.log("esshay");
        console.log(oldJsonObject);
        console.log(key);
        const newKey: string = key.replace(/\s/g, '_');
        const theValueOfOrigKey = oldJsonObject[key as keyof typeof oldJsonObject];
        Object.assign(oldJsonObject,{[newKey]:theValueOfOrigKey});
        delete oldJsonObject[key as keyof typeof oldJsonObject];
        removeWhitespaceFromKeys(oldJsonObject[newKey as keyof typeof oldJsonObject]);  
                                               })
    }
    
    //Iterate through all of the keys 
}