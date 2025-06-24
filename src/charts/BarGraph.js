import {Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'
function BarGraph({title, w, h, xaxis, bar, dataIn, col, keys, lst, k}) {
    var data = []
    if (dataIn) { {/* data alr aggregated */}
        data = dataIn
    } else if (keys && lst && k){ {/* manually count */}
        for (let i = 0; i < keys.length; i++) {
            data[i] = {
                name: keys[i],
                count: lst.filter(x => x[k] == keys[i]).length
            }
        }
    }

    return(
        <div className="chart" id="bar-graph">
            <h3>{title}</h3>
            <BarChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey={xaxis ? xaxis : "name"}/>
                <YAxis />
                <Bar dataKey={bar ? bar : "count"} fill={col} />
            </BarChart>
        </div>
    )
}
export default BarGraph