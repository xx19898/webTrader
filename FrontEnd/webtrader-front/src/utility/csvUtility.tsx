var jquerycsv = require('jquery-csv');

export function processListOfSymbols(csv:string):Object{
    return (jquerycsv.toObjects(csv));
}