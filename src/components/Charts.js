import { BarChart, Bar, 
    Area, AreaChart, 
    Treemap, ResponsiveContainer, 
    Pie, PieChart,
    Tooltip, XAxis, YAxis, Cell, Legend} from  'recharts' 


const palette = ['rgb(232, 227, 145)', '#efc984', '#ecb7d9', '#deaef6', "#a4d1e6"];
const w = 430
const h = 150
const ph = 200

{/* x axis: 1...5, k: value @ x axis, each col. a diff color */}
export function AvgRating({dataIn, data, k}) {
    if (!data) { {/* manually compute averages */}
        var data = Object.entries(
            dataIn.reduce((acc, item) => {
                const key = item[k]
                if (!acc[key]) {
                    acc[key] = { total: 0, count: 0 };
                }
                acc[key].total += item.points;
                acc[key].count += 1;
                return acc;
            }, {})).map(([key, { total, count }]) => ({
                [k]: key,
                avgPoints: total / count
            })
        )
    }
    if (k == "decade") {
        data.sort((a, b) => a.decade.localeCompare(b.decade))
    } else if (k == "genre") {
        data.sort((a, b) => a.genre.localeCompare(b.genre))
    }
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
            name: i + (offset || 1),
            count: lst.filter(x => x[k] == i + (offset || 1)).length
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
export function Stacked({lsts, cols, cnt, swap, categories, k, target, offset, ratio, title, domain, dataIn}) {
    var data = []
    if (dataIn) {
        data = dataIn
    } else if (swap) {
        function helper(lst) {
            var data = []
            for (let i = 0; i < categories.length; i++) {
                data[i] = {
                    name: categories[i], 
                    value: lst.filter(x => x[k] == categories[i]).length
                }
            }
            return data
        }
    
        var data = []
        for (let i = 0; i < lsts.length; i++) {
            const entry = { name : cols[i]}
            for (const item of helper(lsts[i])) {
                entry[item.name] = item.value
            }
            data.push(entry)
        }
    }    else {
        if (lsts.length == 2 || lsts.length == 3) { 
            if (cols) { {/* x axis: cols, 2 lsts as input */}
                for (let i = 0; i < cols.length; i++) {
                    const entry = { name: cols[i]}
                    for (let j = 0; j < lsts.length; j++) {
                        entry[categories[j]] = lsts[j].filter(x => x[k] == cols[i]).length
                    }
                    data.push(entry)
                }
            } else if (cnt) { {/* x axis: 1...cnt, 2 lsts as input */}
                for (let i = 0; i < cnt; i++) {
                    const entry = { name: i + (offset || 1)}
                    for (let j = 0; j < lsts.length; j++) {
                        entry[categories[j]] = lsts[j].filter(x => x[k] == i + (offset || 1)).length
                    }
                    data.push(entry)
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
    }
    
    
    return(
        <div>
            <h3>{title}</h3>
            <BarChart width={w*(ratio || 1)} height={h} data={data}>
                <XAxis dataKey="name" />
                <YAxis domain={domain}/>
                <Tooltip />
                <Legend/>
                {Array.from({ length: categories.length }, (_, i) => i).map((x) => (
                    <Bar dataKey={categories[x]} stackId="a" fill={palette[x]} />
                ))}
            </BarChart>
        </div>
    )
}

export function Stacked2({movies, tv, categories, ratio, k, title}) {
    const movieData = []
    for (const cat of categories) {
        movieData.push({
            name: cat,
            value: movies.filter(x => x[k] == cat).length * 2
        })
    }

    const tvData = []
    for (const cat of categories) {
        tvData.push({
            name: cat,
            value: tv.filter(x => x[k] == cat).reduce((acc, x) => acc + x.episodes, 0)
        })
    }

    function accumulate(lst, name) {
        return lst.reduce((acc, x) => {
            acc[x.name] = x.value
            return acc;
        }, { name: name })
    }

    return(
        <div>
            <h3>{title}</h3>
            <BarChart width={w * (ratio || 1)} height={h} 
            data={[accumulate(movieData, "movies"), accumulate(tvData, "shows")]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend/>
                {Array.from({ length: categories.length }, (_, i) => i).map((x) => (
                    <Bar dataKey={categories[x]} stackId="a" fill={palette[x]} />
                ))}
            </BarChart>
        </div>
    )
}

export function AreaGraph({lst, k, cnt, offset, title, lineCol, fillCol}) {
    var data = []
    for (let i = 0; i < cnt; i++) {
        data[i] = {
            name: i + (offset || 1),
            count: lst.filter(x => x[k] == i + (offset || 1)).length
        }
    }

    return(
        <div>
            <h3>{title}</h3>
            <AreaChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey="name" />
                <YAxis interval={0}/>
                <Area dataKey="count"
                stroke={palette[lineCol]} 
                fill={palette[fillCol]}/>
            </AreaChart>
        </div>
    )
}

export function StackedArea({lsts, k, cnt, offset, title, categories}) {
    var data = []
    for (let i = 0; i < cnt; i++) {
        const entry = { name: i + (offset || 1)}
        for (let j = 0; j < categories.length; j++) {
            entry[categories[j]] = lsts[j].filter(x => x[k] == i + (offset || 1)).length
        }
        data.push(entry)
    }
    
    return(
        <div>
            <h3>{title}</h3>
            <AreaChart width={w} height={h} data={data}>
                <Tooltip/>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 12]}interval={0}/>
                {Array.from({ length: categories.length }, (_, i) => i).map((x) => (
                    <Area dataKey={categories[x]} stackId="a" fill={palette[x]} stroke={palette[x]} />
                ))}
            </AreaChart>
        </div>
    )
}

export function Themes({dataIn}) {
    const themeCounts = {};
    dataIn.forEach(({ theme }) => {
        const themes = Array.isArray(theme) ? theme : [];
        themes.forEach(t => {
            if (!themeCounts[t]) {
                themeCounts[t] = 0;
            }
            themeCounts[t] += 1;
        });
    });

    const data = Object.entries(themeCounts).map(([theme, count]) => ({
        name: theme,
        size: count
      }));
      
    return(
        <div style={{width: "100%"}}>
            <h3>themes</h3>
            <ResponsiveContainer width="100%" height={h}>
            <Treemap
            data={data}
            dataKey="size"
            nameKey="name"
            fontSize={8}
            >
                <Tooltip />
            </Treemap>
            </ResponsiveContainer>
        </div>
    )
}


export function PieGraph({categories, lst, target, dataIn, title, noLegend, ratio}) {
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
    data.sort((a, b) => a.name.localeCompare(b.name))
    
    
    const renderCustomizedLabel = ({ percent }) => {
        return `${(percent * 100).toFixed(0)}%`;
      };

    return(
        <div>
            <h3> 
                { title? title : target}
            </h3>
            
            <PieChart height={ph} width={w * (ratio || 1)}>
                <Pie data={data} 
                cx="50%" cy="50%" 
                outerRadius={50 * (ratio || 1)} 
                dataKey={"value"} 
                label={renderCustomizedLabel} >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={palette[index]} />
                    ))}
                </Pie>
                <Tooltip />
                {!noLegend && 
                <Legend layout="vertical" align="right" iconSize={5}/> }
            </PieChart>
        </div>
    )
}


