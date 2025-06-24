import { Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
function RatingChart({palette, w, h, lst}) {
    const ratings = ["s1", "s2", "s3", "s4", "s5"]
    const data = []
    for(let i = 1; i <= 5; i++) {
        data[i - 1] = {
            rating: i,
            count: lst.filter(x => x.rating == ratings[i - 1]).length
        }
    }

    return(
        <div className='chart'>
            <h3>rating distribution</h3>
            <BarChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey="rating" type="category"/>
                <YAxis />
                <Bar dataKey="count" >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={palette[index]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    )
}
export default RatingChart
