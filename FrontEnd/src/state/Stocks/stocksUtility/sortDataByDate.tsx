


const calcMidPoint = (a:number,b:number) => {
    if(a == 0 && b == 1){
        return 0
    }
    const midPoint = Math.round((a + b) / 2)
    //console.log("called calc left: " + a + " ,right: " + b + " ,midpoint: " + midPoint)
    return midPoint;
}

//TODO: IMPLEMENT MERGE SORT 
const sortDataByDate: any = (array:number [][]) => {
    const half = array.length / 2

    if(array.length < 2){
      return array
    }
    const left = array.splice(0,half)
    return merge(sortDataByDate(left),sortDataByDate(array))  
    }

const compareDates = (firstDate: string | number,secondDate: string | number) => {
   if(typeof firstDate === 'number' || typeof secondDate === 'number') throw new Error("trying to parse integer to a date in compare dates function")
   const firstDateAsDate = new Date(firstDate)
   const secondDateAsDate = new Date(secondDate)
   return firstDateAsDate.getTime() > secondDateAsDate.getTime()
}

const merge = (left:number[][],right:number[][]) => {
  let arr = []
  while(left.length && right.length){
    if(left[0][0] < right[0][0]){
      arr.push(left.shift())
    }else{
      arr.push(right.shift())
    }
  }

  return [...arr, ...left, ...right]
}

export default sortDataByDate

export {compareDates}