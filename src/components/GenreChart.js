import { Pie, PieChart, Tooltip, Cell, Legend } from 'recharts'

function GenreChart({palette, w, h, lst}) {
    
    const genresLst = ["comedy", "drama", "romance", "horror", "mystery", "sci-fi"]
    const data = []
    for (let i = 0; i < genresLst.length; i++) {
        data[i] = {
            name: genresLst[i], 
            value: lst.filter(x => x.genre == genresLst[i]).length
        }
    }

    return(
        <div id="genre-chart">
            <h3>genre breakdown</h3>
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