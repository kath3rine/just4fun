import {Tooltip, BarChart, Bar, XAxis, YAxis, Cell } from 'recharts'
function BarGraph({title, w, h, xaxis, bar, dataIn, col, palette, keys, lst, k}) {
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
                <XAxis dataKey={xaxis ? xaxis : "name"} interval={0}/>
                <YAxis domain={bar == "avgPoints" ? [0, 5] : [0, 8]} interval={0}/>
                {palette
                    ? <Bar dataKey={bar ? bar : "count"} >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={palette[index]} />
                        ))} 
                        </Bar>
                    : <Bar dataKey={bar ? bar : "count"} fill={col} />
                }
            </BarChart>
        </div>
    )
}
export default BarGraph