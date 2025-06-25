import { AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts'

const palette = ['rgb(232, 227, 155)', '#efc994', '#ecc7d9', '#debef6', "#b4d1e6"];
const w = 420
const h = 200

export function AreaGraph({lst, k, cnt, offset, title, lineCol, fillCol}) {
    var data = []
    for (let i = 0; i < cnt; i++) {
        data[i] = {
            name: i + offset,
            count: lst.filter(x => x[k] == i + offset).length
        }
    }

    return(
        <div>
            <h3>{title}</h3>
            <AreaChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 8]} interval={0}/>
                <Area dataKey="count"
                stroke={palette[lineCol]} 
                fill={palette[fillCol]}/>
            </AreaChart>
        </div>
    )
}