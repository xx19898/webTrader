import {v4 as uuidv4} from 'uuid'
import {FixedSizeList as List} from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer';
import { IStockSymbolList } from '../../state/Stocks/stocksZodSchemas';
 

interface IVirtualizedList {
    filteredData:string[],
    itemSize: number,
    setValue: (newValue:string) => void
    setHighlightedValue: (newValue:string) => void,
}

const VirtualizedList = ({filteredData,itemSize,setValue,setHighlightedValue}:IVirtualizedList) => {
    return(
        <>
        <AutoSizer>
            {({height,width}) => (
                <List
                itemSize={itemSize}
                itemData={filteredData}
                height={height}
                width={width}
                itemCount={filteredData.length}
                style={{borderRadius:'17px'}}
                innerElementType="ul"
                 >
                    {({data, index, style }) => {
          
            if(index === (data.length - 1)){
                return <li className="w-auto bg-gray-300 content-end  text-right
                hover:bg-primary hover:cursor-pointer" style={style}
                onClick={() => {
                    setValue(data[index])
                    setHighlightedValue("")
                }}
                onMouseEnter={() =>setHighlightedValue(data[index])}
                onMouseLeave={() => setHighlightedValue("")}
                key={uuidv4()}>
                    <p className="mr-[20px]">{data[index]}</p></li>
            }
            return <li className="w-auto bg-gray-300 content-end  text-right after:content-['']
            after:w-full after:bg-primary/40 after:rounded-sm hover:bg-primary hover:cursor-pointer after:h-[1.5px] 
            after:absolute after:list-item after:box-content" style={style}
            onClick={() => {
                setValue(data[index])
                setHighlightedValue("")
            }}
            onMouseEnter={() =>setHighlightedValue(data[index])}
            onMouseLeave={() => setHighlightedValue("")}
            key={uuidv4()}>
                <p className="mr-[20px]">{data[index]}</p></li>
        }}
                </List>
            )}
            </AutoSizer>
        </>
    )
}


interface IDropDownList{
    listItemSize: number,
    filteredData: string[],
    chosenElement: string,
    setValue: (newValue: string) => void
    setHighlightedValue: (newHighlightedValue: string) => void,
}

const DropdownList = ({filteredData,chosenElement,listItemSize,setValue,setHighlightedValue}:IDropDownList) => {

        
        //Rendering full list of 12k elements,thus using virtualized
        if(chosenElement.trim().length === 0){
            return(
            <div className="h-40 w-full overflow-visible">
                <VirtualizedList filteredData={filteredData} itemSize={30} setValue={setValue} setHighlightedValue={setHighlightedValue}/>            
            </div>
            )

        //No items found on the query
        }else if(filteredData.length === 0){
                return <li className="w-full list-none bg-gray-300 content-end  text-right h-[30px]" key={uuidv4()}>
                    <p className="mr-[20px]">{"None found"}</p>
                      </li>

        //Showing symbols that were found on the query
        }else{
             return <>{
                filteredData.length > 20 
                ? 
                <div className={
                    `h-[160px]
                     w-full overflow-auto`}>
                <VirtualizedList filteredData={filteredData} itemSize={listItemSize} setValue={setValue}
                setHighlightedValue={setHighlightedValue}/>            
                </div>
                :
                <ul className="bg-gray-300 rounded-[17px]">
                    {
                        filteredData.map((element,index) => {
                            return(
                            (index === filteredData.length - 1) 
                            ?
                            <li className="w-full overflow-hidden h-[30px] bg-gray-300 content-end  text-right
                            hover:bg-primary hover:cursor-pointer rounded-[17px]" 
                            onClick={() => {
                                setValue(element)
                                setHighlightedValue("")
                            }
                            }
                            onMouseEnter={() =>setHighlightedValue(element)}
                            onMouseLeave={() => setHighlightedValue("")}
                            key={uuidv4()}
                            >{<p className="relative right-[20px]">{element}</p>}</li>
                            :
                            <li className="w-auto h-[30px] right-[20px] bg-gray-300 content-end  text-right after:content-['']
                            after:w-full after:bg-primary/40 after:rounded-sm hover:bg-primary hover:cursor-pointer after:h-[1.5px] 
                            after:list-item after:box-content rounded-[17px]"
                            onClick={() => {
                                setValue(element)
                                setHighlightedValue("")
                            }}
                            onMouseEnter={() =>setHighlightedValue(element)}
                            onMouseLeave={() => setHighlightedValue("")}
                            key={uuidv4()}>
                                {<p className="relative right-[20px]">{element}</p>}
                            </li>
                            )
                        })
                    }
                </ul>
             }
            </>
            }
    }


export default DropdownList;