type IDataset = {
    label: string,
    data: number[],
    fill: boolean,
    borderColor: string,
    tension: number,
}

type IStockViewerChartData = {
    labels: Date[] | null,
    datasets: IDataset[],
}

// getting random rgb for every chart dataset to differentiate between the lines
function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}
