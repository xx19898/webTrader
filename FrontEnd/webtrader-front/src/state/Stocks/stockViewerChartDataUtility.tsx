type IDataset = {
    label: string,
    data: number[],
    fill: boolean,
    borderColor: string,
    tension: number,
}

type IStockViewerChartData = {
    labels: Date[],
    datasets: IDataset | null,
}


const getAnEmptyStockViewerChartData => <IStockViewerChartData,>() => {
    return
}


function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}
