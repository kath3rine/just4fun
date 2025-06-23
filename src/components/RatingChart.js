import { Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
function RatingChart({palette, title, w, h, lst}) {
    const ratings = ["s1", "s2", "s3", "s4", "s5"]
    const data = []
    for(let i = 1; i <= 5; i++) {
        data[i - 1] = {
            name: i,
            value: lst.filter(x => x.rating == ratings[i - 1]).length
        }
    }

    return(
        <div>
            <h3>{title}</h3>
            <BarChart width={w} height={h} data={data}>
                <XAxis dataKey="name" type="category"/>
                <YAxis />
                <Bar dataKey="value" >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={palette[index]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    )
}
export default RatingChart
