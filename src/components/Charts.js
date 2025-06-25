
import { AreaChart, Area, Tooltip, Pie, PieChart, Legend, BarChart, Bar, XAxis, YAxis, Cell} from  'recharts' 

const w = 400;
const h = 200;
const palette = ['rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6"];

export function AreaGraph({lst, target, xaxis, title}) {
    var data = []
    for (let i = 0; i < xaxis.length; i++) {
        data[i] = {
            name: xaxis[i],
            count: lst.filter(x => x[target] == xaxis[i]).length
        }
    }

    return(
        <div>
            <h3>{title}</h3>
            <AreaChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Area dataKey="count" type="monotone" stroke={palette[1]} fill={palette[0]}/>
            </AreaChart>
        </div>
    )
}

export function BarGraph({lst, target, xaxis, title}) {
    var data = []
    for (let i = 0; i < xaxis.length; i++) {
        data[i] = {
            name: xaxis[i],
            count: lst.filter(x => x[target] == xaxis[i]).length
        }
    }
    return(
        <div>
            <h3>{title}</h3>
            
            <BarChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Bar dataKey="count" fill={palette[0]} />
            </BarChart>
        </div>
    )
}

export function AvgRating({data, target}) {
    return(
        <div>
            <h3>average rating (by {target})</h3>
            <BarChart width={w} height={h} data={data}>
                <XAxis dataKey={target} intverval={0}/>
                <YAxis domain={[0, 5]} interval={0}/>
                <Tooltip/>

                <Bar dataKey="avgPoints" >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={palette[index]} />
                    ))} 
                </Bar>

            </BarChart>
        </div>
    )
}

export function PieGraph({categories, lst, target, dataIn}) {
    var data = []
    if (dataIn) {
        data = dataIn;
    } else {
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
                <Pie data={data} cx="40%" cy="40%" outerRadius={50} 
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

export function GradientBarGraph({lst, target, title}) {
    const data = []
    for(let i = 0; i < 5; i++) {
        data[i] = {
            rating: i + 1,
            count: lst.filter(x => x[target] == i + 1).length
        }
    }

    return(
        <div className='chart'>
            <h3>{title}</h3>
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

export function StackedNum({lsts, categories, target, cnt, k, title}){
    const data = []
    if (cnt == 12 && lsts.length == 2) {
        for (let i = 0; i < cnt; i++) {
            var shows = []
            shows = lsts[1].filter(x => x[k] == i + 1) 
            data[i] = {
                name: i + 1,
                [categories[0]]: lsts[0].filter(x => x[k] == i + 1).length * 2,
                [categories[1]]: shows.length > 0 
                    ? shows.reduce((acc, x) => x.episodes + acc, 0) * shows.length 
                    : 0
            }
        }
    } else {
        for (let i = 0; i < cnt; i++) {
            const entry = { name: i + 1 };
            if (lsts.length === 2) {
                entry[categories[0]] = lsts[0].filter(x => x[k] === i + 1).length;
                entry[categories[1]] = lsts[1].filter(x => x[k] === i + 1).length;
            } else if (categories.length <= 5 && target) {
                for (let cat of categories) {
                    entry[cat] = lsts.filter(x => x[k] === i + 1 && x[target] === cat).length;
                }
            }
            data.push(entry);
        }
    }

    return(
        <div>
            <h3>{title} (by {target ? target : "media"})</h3>
            
            <BarChart width={w} height={h} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                {Array.from({ length: categories.length}, (_, i) => i).map((x) => (
                    <Bar dataKey={categories[x]} stackId="a" fill={palette[x]} />
                ))}
            </BarChart>
        </div>
    )
}

export function StackedCat({lsts, cols, categories, target, title}) {
    const data = []
    for (let i = 0; i < cols.length; i++) {
        data[i] = {
            name: cols[i],
            [categories[0]]: lsts[0].filter(x => x[target] == cols[i]).length,
            [categories[1]]: lsts[1].filter(x => x[target] == cols[i]).length
        }
    }
    return(
        <div>
            <h3>{title}</h3>
            <BarChart width={w} height={h} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                {Array.from({ length: categories.length}, (_, i) => i).map((x) => (
                    <Bar dataKey={categories[x]} stackId="a" fill={palette[x]} />
                ))}
\
            </BarChart>
        </div>
    )
}

