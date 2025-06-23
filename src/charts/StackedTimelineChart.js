import {Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'
function StackedTimelineChart({palette, title, lst1, lst2, w, h, field}) {
    const data = []
    if (field == "month") {
        for (let i = 1; i < 7; i++) {
            data[i - 1] = {
                name: i.toString(),
                movies: lst1.filter(x => x.month == i).length,
                shows: lst2.filter(x => x.month == i).length
            }
        }
    } else if (field == "decade") {
        let decades = ["70s", "80s", "90s", "00s", "10s", "20s"]
        for (let i = 0; i < decades.length; i++) {
            data[i] = {
                name: decades[i],
                movies: lst1.filter(x => x.decade == decades[i]).length,
                shows: lst2.filter(x => x.decade == decades[i]).length
            }
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
                <Bar dataKey="movies" stackId="a" fill={palette[0]} />
                <Bar dataKey="shows" stackId="a" fill={palette[1]} />
            </BarChart>
        </div>
    )
}
export default StackedTimelineChart