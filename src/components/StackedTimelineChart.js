import {Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'
function StackedTimelineChart({palette, title, lst1, lst2, w, h}) {
    const data = []
    for (let i = 1; i < 7; i++) {
        data[i - 1] = {
            name: i.toString(),
            movies: lst1.filter(x => x.month == i).length,
            shows: lst2.filter(x => x.month == i).length
        }
    }

    return(
        <div id="stacked-timeline-chart">
            <h3>{title}</h3>
            <BarChart width={w} height={h} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="shows" stackId="a" fill={palette[3]} />
                <Bar dataKey="movies" stackId="a" fill={palette[4]} />
            </BarChart>
        </div>
    )
}
export default StackedTimelineChart