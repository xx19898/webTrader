import {v4 as uuidv4} from 'uuid'
import {FixedSizeList as List} from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer';


import { IStockSymbolList } from "../../state/Stocks/stocksZodSchemas"

interface IDropDownList{
    filteredData: string[],
    chosenElement: string,
    dataToVisualise: IStockSymbolList,
    height: number,
    width: number,
}

const DropdownList = ({filteredData,chosenElement,dataToVisualise,height,width}:IDropDownList) => {

        
        //Rendering full list of 12k elements,thus using virtualized
        if(chosenElement.trim().length === 0){
            return(
            <>
            <AutoSizer>
            {({height,width}) => (
                <List
                itemSize={20}
                itemData={filteredData}
                height={height}
                width={width}
                itemCount={filteredData.length}
                innerElementType="ul"
                 >
                    {({data, index, style }) => {
          
            if(index != (data.length - 1)){
                return <li className="w-auto bg-gray-300 content-end  text-right
                hover:bg-secondary-2/10 hover:cursor-pointer">
                    <p className="mr-[20px]">{data[index]}</p></li>
            }
            return <li className="w-auto bg-gray-300 content-end  text-right after:content-['']
            after:w-full after:bg-primary/40 after:rounded-sm hover:bg-secondary-2/10 hover:cursor-pointer after:h-[1.5px] 
            after:absolute after:list-item after:box-content "><p className="mr-[20px]">{data[index]}</p></li>
          
        }}
                </List>
            )}
            </AutoSizer>
            </>
            )

        }
        else if(filteredData.length === 0){
                return <li className="w-auto bg-gray-300 content-end  text-right after:content-['']
                after:w-full after:bg-primary/40 after:rounded-sm hover:bg-secondary-2/10 hover:cursor-pointer after:h-[1.5px] 
                after:absolute after:list-item after:box-content "><p className="mr-[20px]">{"None found"}</p></li>
        }else{
             return <>{filteredData.map(
                (symbol,index) => index == (dataToVisualise.length - 1)
                ?
                <li key={uuidv4()} className="w-auto bg-gray-300 list-item content-end hover:bg-secondary-2/30 hover:cursor-pointer text-right"><p className="mr-[20px]">{symbol}</p></li>
                :
                <li key={uuidv4()} className="w-auto bg-gray-300 content-end  text-right after:content-['']
                            after:w-full after:bg-primary/40 after:rounded-sm hover:bg-secondary-2/30 hover:cursor-pointer after:h-[1.5px] after:absolute after:list-item after:box-content "><p className="mr-[20px]">{symbol}</p></li>
            )
            }
            </>
            }
    }


export default DropdownList;