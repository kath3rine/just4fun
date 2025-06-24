import { Pie, PieChart, Tooltip, Cell, Legend } from 'recharts'

function MyPie({palette, categories, w, h, lst, k, dataIn, lsts}) {
    var data = []
    if (dataIn) {
        data = dataIn
    } else if (lsts) {
        for (let i = 0; i < lsts.length; i++) {
            data[i] = {
                name: categories[i], value: lsts[i].length
            }
        }
    } else {
        for (let i = 0; i < categories.length; i++) {
            data[i] = {
                name: categories[i], 
                value: lst.filter(x => x[k] == categories[i]).length
            }
        }
    }

    const renderCustomizedLabel = ({ percent }) => {
        if (!percent) return null; // Don't show zeros
        return `${(percent * 100).toFixed(0)}%`;
      };
    

    return(
        <div className="chart" id="pie-chart">
            <h3>{k} breakdown</h3>
            <PieChart height={h} width={w}>
                <Pie data={data} cx="40%" cy="50%" outerRadius={50} 
                dataKey={dataIn ? "points" : "value"} label={renderCustomizedLabel} >
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