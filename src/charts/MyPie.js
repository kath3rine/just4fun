import { Pie, PieChart, Tooltip, Cell, Legend } from 'recharts'

function MyPie({palette, categories, w, h, lst, k, dataIn}) {
    
    var data = []
    if (!dataIn) { {/* count */}
        for (let i = 0; i < categories.length; i++) {
            data[i] = {
                name: categories[i], 
                value: lst.filter(x => x[k] == categories[i]).length
            }
        }
    } else if (dataIn) {
        data = dataIn
    }
    

    return(
        <div className="chart" id="pie-chart">
            <h3>{k} breakdown</h3>
            <PieChart height={h} width={w}>
                <Pie data={data} cx="50%" cy="50%" outerRadius={80} 
                dataKey={dataIn ? "points" : "value"} label="true">
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
export default MyPie