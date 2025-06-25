import { Tooltip, BarChart, Bar, XAxis, YAxis, Cell, Legend} from  'recharts' 

const palette = ['rgb(232, 227, 155)', '#efc994', '#ecc7d9', '#debef6', "#b4d1e6"];
const w = 420
const h = 200

{/* x axis: 1...5, k: value @ x axis, each col. a diff color */}
export function AvgRating({data, k}) {
    return(
        <div>
            <h3>average rating (by {k})</h3>
            <BarChart width={w} height={h} data={data}>
                <XAxis dataKey={k} intverval={0}/>
                <YAxis domain={[0, 5]} interval={0}/>
                <Tooltip/>
                <Bar dataKey="avgPoints" >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} 
                        fill={palette[index]} />
                    ))} 
                </Bar>

            </BarChart>
        </div>
    )
}

{/* color=index of palette that should be filled. gradient if o/w */}
export function BarGraph({lst, k, title, cnt, offset, color}) {
    const data = []
    for(let i = 0; i < cnt; i++) {
        data[i] = {
            name: i + offset,
            count: lst.filter(x => x[k] == i + offset).length
        }
    }

    return(
        <div className='chart'>
            <h3>{title}</h3>
            <BarChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey="name" type="category"/>
                <YAxis />
                <Bar dataKey="count" >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} 
                        fill={color >= 0 && color <= palette.length 
                            ? palette[color] 
                            : palette[index % palette.length]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    )
}

{/* cols: values along the x axis, k: x axis value, 
categories: colors, target: criteria value for the category */}
export function Stacked({lsts, cols, cnt, categories, k, target, title}) {
    const data = []
    if (lsts.length == 2) { 
        if (title == "hrs watched each month") { {/* data contains hrs of each media type */}
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
        } else if (cols) { {/* x axis: cols, 2 lsts as input */}
            for (let i = 0; i < cols.length; i++) {
                data[i] = {
                    name: cols[i],
                    [categories[0]]: lsts[0].filter(x => x[k] == cols[i]).length,
                    [categories[1]]: lsts[1].filter(x => x[k] == cols[i]).length
                }
            }
        } else if (cnt) { {/* x axis: 1...cnt, 2 lsts as input */}
            for (let i = 0; i < cnt; i++) {
                data[i] = {
                    name: i + 1,
                    [categories[0]]: lsts[0].filter(x => x[k] == i + 1).length,
                    [categories[1]]: lsts[1].filter(x => x[k] == i + 1).length
                }
            }
        }
    } else {
        if (cnt) { {/* x axis: 1...cnt, list of jsons as input */}
            for (let i = 0; i < cnt; i++) {
                const item= { name: i + 1 };
                for (let c of categories) {
                    item[c] = lsts.filter(x => x[k] == i + 1 && x[target] == c).length
                }
                data.push(item)
            }
        }
    }
    
    return(
        <div>
            <h3>{title}</h3>
            <BarChart width={w} height={h} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend/>
                {Array.from({ length: categories.length}, (_, i) => i).map((x) => (
                    <Bar dataKey={categories[x]} stackId="a" fill={palette[x]} />
                ))}
            </BarChart>
        </div>
    )
}

