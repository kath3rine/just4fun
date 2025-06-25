import { Tooltip, Pie, PieChart, Legend, Cell} from  'recharts' 
const palette = ['rgb(232, 227, 155)', '#efc994', '#ecc7d9', '#debef6', "#b4d1e6"];
const w = 420
const h = 200

export function PieGraph({categories, lst, target, dataIn}) {
    var data = []
    if (dataIn) { {/* data alr aggregated */}
        data = dataIn;
    } else { {/* manually count */}
        for (let i = 0; i < categories.length; i++) {
            data[i] = {
                name: categories[i], 
                value: lst.filter(x => x[target] == categories[i]).length
            }
        }
    }
    
    const renderCustomizedLabel = ({ percent }) => {
        if (!percent) return null; // Don't show zeros
        return `${(percent * 100).toFixed(0)}%`;
      };

    return(
        <div>
            <h3>{target} breakdown</h3>
            <PieChart height={h} width={w}>
                <Pie data={data} cx="50%" cy="50%" outerRadius={70} 
                dataKey={"value"} label={renderCustomizedLabel} >
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