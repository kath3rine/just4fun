import { Pie, PieChart, Tooltip, Cell, Legend } from 'recharts'

function GenreChart({palette, keys, w, h, lst, field}) {
    
    const data = []
    for (let i = 0; i < keys.length; i++) {
        data[i] = {
            name: keys[i], 
            value: lst.filter(x => x[field] == keys[i]).length
        }
    }

    return(
        <div id="genre-chart">
            <h3>{field} breakdown</h3>
            <PieChart className='chart' height={h} width={w}>
                <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={palette[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right"/>
            </PieChart>
        </div>
    )
}
export default GenreChart