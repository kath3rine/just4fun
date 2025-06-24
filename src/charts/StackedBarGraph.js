import {Legend, Tooltip, BarChart, Bar, XAxis, YAxis} from 'recharts'
function StackedTimelineChart({cols, title, lsts, lst, target, keys, k, w, h, bars}) {
    const data = []
    if (bars.length == 2) {
        for (let i = 0; i < keys.length; i++) {
            data[i] = {
                name: keys[i],
                [bars[0]]: lsts[0].filter(x => x[k] == keys[i]).length,
                [bars[1]]: lsts[1].filter(x => x[k] == keys[i]).length
            }
        }
    } else if (target) {
        for (let i = 0; i < keys.length; i++) {
            data[i] = {
                name: keys[i],
                [bars[0]]: lst.filter(x => 
                    (x[k] == keys[i] && x[target] == bars[0])
                ).length,
                [bars[1]]: lst.filter(x => 
                    (x[k] == keys[i] && x[target] == bars[1])
                ).length,
                [bars[2]]: lst.filter(x => 
                    (x[k] == keys[i] && x[target] == bars[2])
                ).length,
                [bars[3]]: lst.filter(x => 
                    (x[k] == keys[i] && x[target] == bars[3])
                ).length,
                [bars[4]]: lst.filter(x => 
                    (x[k] == keys[i] && x[target] == bars[4])
                ).length
            }
        }
    }
        
    

    return(
        <div className="chart" id="stacked-bar-chart">
            <h3>{title}</h3>

            <BarChart width={w} height={h} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                {Array.from({ length: bars.length}, (_, i) => i).map((x) => (
                    <Bar dataKey={bars[x]} stackId="a" fill={cols[x]} />
                ))}
\
            </BarChart>
        </div>
    )
}
export default StackedTimelineChart