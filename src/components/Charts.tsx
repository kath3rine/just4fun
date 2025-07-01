import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, Treemap, PieChart, Pie, Legend, Area, AreaChart } from 'recharts';
const palette = ['rgb(232, 227, 125)', '#efc964', '#ecb7d9', '#ceaef6', "#a4d1e6"];

{/* BARS */}

type StackedBarProps = {
    title?: string
    dataIn?: any[]
    lsts?: {[key: string]: string | number}[][]
    cnt?: number
    cols: string[] | number[]
    domain?: number
    ratio?: number
    categories: string[]
    k: keyof {[key: string]: string | number}
    target: keyof {[key: string]: string | number}
    swap?: boolean
    offset?: number
    w: number
    h: number
}



export function StackedBar(props: StackedBarProps) {
    function myHelper(lst: {[key: string]: string | number}[]) {
        var data: {name: string; value: number}[] = []
        for (let i = 0; i < props.categories.length; i++) {
            data[i] = {
                name: props.categories[i], 
                value: lst.filter(x => x[props.k] == props.categories[i]).length
            }
        }
        return data
    }
    var test: string = "null"
    var data: any[] = []

    if (props.dataIn) {
        test="1"
        data = props.dataIn
    } else if (props.swap && props.lsts && props.cols) {
        test="2"
        for (let i = 0; i < props.lsts.length; i++) {
            const entry: any = { name : props.cols[i]}
            for (const item of myHelper(props.lsts[i])) {
                entry[item.name] = item.value
            }
            data.push(entry)
        }
    } else {
        if (props.lsts && (props.lsts.length == 2 || props.lsts.length == 3)) {
            if (props.cols) {
                test="3"
                for (let i = 0; i < props.cols.length; i++) {
                    const entry: any = { name: props.cols[i]}
                    for (let j = 0; j < props.lsts.length; j++) {
                        entry[props.categories[j]] = props.lsts[j].filter(x => x[props.k] == props.cols[i]).length
                    }
                    data.push(entry)
                }
            }
            else if (props.cnt && props.lsts) {
                test="4"
                for (let i = 0; i < props.cnt; i++) {
                    const entry: any = { name: i + (props.offset || 1)}
                    for (let j = 0; j < props.lsts.length; j++) {
                        entry[props.categories[j]] = props.lsts[j].filter(x => x[props.k] == i + (props.offset || 1)).length
                    }
                    data.push(entry)
                }
        } 
        } else {
            if (props.cnt && props.lsts) {
                test="5"
                for (let i = 0; i < props.cnt; i++) {
                    const item: any= { name: i + 1 };
                    for (let c of props.categories) {
                        item[c] = props.lsts
                            .flat()
                            .filter(x => x[props.k] == i + 1 && x[props.target] == c).length ?? 0
                    }
                    data.push(item)
                }
            }
        }
    }

    return(
        <div>
            <h3>{props.title}</h3>
            <BarChart width={props.w * (props.ratio || 1)} height={props.h} data={data}>
                <XAxis dataKey="name" />
                <YAxis/>
                <Tooltip />
                <Legend/>
                {Array.from({ length: props.categories.length }, (_, i) => i).map((x) => (
                    <Bar dataKey={props.categories[x]} 
                    stackId="a" 
                    fill={palette[x]} />
                ))}
            </BarChart>
        </div>
    )
}

type AvgRatingProps = {
    rawData: {points: number; [key: string | number]: string | number }[];
    cleanData: { [key: string | number]: string | number; avgPoints: number }[];
    k: string;
    w: number;
    h: number;
};

export function AvgRating(props: AvgRatingProps) {
  var data : any;
  if (!props.cleanData && props.rawData) {
    data = Object.entries(
        props.rawData.reduce<Record<string, { total: number; count: number }>>((acc, item) => {
        const key = String(item[props.k]);
        if (!acc[key]) {
          acc[key] = { total: 0, count: 0 };
        }
        acc[key].total += item.points;
        acc[key].count += 1;
        return acc;
      }, {})
    ).map(([key, { total, count }]) => ({
      [props.k]: key,
      avgPoints: total / count,
    }));
  } else if (props.cleanData) {
    data = props.cleanData
  }

  switch (props.k) {
    case 'decade':
        data.sort((a: any, b: any) => String(a.decade).localeCompare(String(b.decade)));
        break
    case 'genre':
        data.sort((a: any, b: any) => String(a.genre).localeCompare(String(b.genre)));
        break
  }

  return (
    <div>
      <h3>average rating (by {props.k})</h3>
      <BarChart width={props.w} height={props.h} data={data}>
        <XAxis dataKey={props.k} interval={0} />
        <YAxis domain={[0, 5]} interval={0} />
        <Tooltip />
        <Bar dataKey="avgPoints">
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} 
            fill={palette[index % palette.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}


type BarGraphProps = {
    w: number;
    h: number;
    title: string;
    lst: { [key: string]: string | number }[]
    color?: number;
    offset?: number;
    k: string;
    cnt: number;
}

export function BarGraph(props: BarGraphProps) {
    let data: any[] = []
    for(let i = 0; i < props.cnt; i++) {
        data[i] = {
            name: i + (props.offset || 1),
            count: props.lst.filter(x => x[props.k] == i + (props.offset || 1)).length
        }
    }

    return(
        <div className='chart'>
            <h3>{props.title}</h3>
            <BarChart width={props.w} height={props.h} data={data}>
                <Tooltip/>
                <XAxis dataKey="name" type="category"/>
                <YAxis />
                <Bar dataKey="count" >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} 
                        fill={props.color && props.color >= 0 && props.color <= palette.length 
                            ? palette[props.color] 
                            : palette[index % palette.length]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    )
}

type Stacked2Props = {
    movies: {[key: string]: string | number }[]
    shows: {episodes: number; [key: string]: string | number }[]
    categories: string[]
    k: string
    title?: string
    w: number
    h: number
    ratio?: number
}

export function Stacked2(props: Stacked2Props) {
    function accumulate(lst: any[], name: string) {
        return lst.reduce((acc, x: {name: string; value: number}) => {
            acc[x.name] = x.value
            return acc;
        }, { name: name })
    }

    const movieData: {name: string; value: number}[] = []
    for (const cat of props.categories) {
        movieData.push({
            name: cat,
            value: props.movies.filter(x => x[props.k] == cat).length * 2
        })
    }

    const tvData: {name: string; value: number}[]= []
    for (const cat of props.categories) {
        tvData.push({
            name: cat,
            value: props.shows
                .filter(x => x[props.k] == cat)
                .reduce((acc, x) => acc + x.episodes, 0)
        })
    }
    return(
        <div>
            <h3>{props.title}</h3>
            <BarChart width={props.w * (props.ratio || 1)} height={props.h} 
            data={[accumulate(movieData, "movies"), accumulate(tvData, "shows")]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend/>
                {Array.from({ length: props.categories.length }, (_, i) => i).map((x) => (
                    <Bar dataKey={props.categories[x]} stackId="a" fill={palette[x]} />
                ))}
            </BarChart>
        </div>
    )
}

{/* TREEMAPS */}

type ThemeProps = {
    h: number;
    dataIn: { theme?: string[] }[]
}

export function Themes(props: ThemeProps) {
    const themeCounts: any = {};
    props.dataIn.forEach(({ theme } : any) => {
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
            <ResponsiveContainer width="100%" height={props.h}>
            <Treemap
            data={data}
            dataKey="size"
            nameKey="name"
            >
                <Tooltip />
            </Treemap>
            </ResponsiveContainer>
        </div>
    )
}

{/* PIES */}

type PieGraphProps = {
    title?: string;
    lst: { [key: string]: string | number }[]
    target: string
    categories: string[]
    dataIn?: {name: string; value: number}[]
    noLegend?: boolean
    ratio?: number
    h: number
    w: number
}

export function PieGraph(props: PieGraphProps) {
    const renderCustomizedLabel = ({ percent }: any) => {
        return `${(percent * 100).toFixed(0)}%`;
      };

    let data: {name: string; value: number}[] = []
    if (props.dataIn) {
        data = props.dataIn
    } else {
        for (let i = 0; i < props.categories.length; i++) {
            data[i] = {
                name: props.categories[i], 
                value: props.lst.filter(x => x[props.target] == props.categories[i]).length
            }
        }
    }
    return(
        <div>
            <h3> 
                { props.title? props.title : props.target}
            </h3>
            
            <PieChart height={props.h} width={props.w * (props.ratio || 1)}>
                <Pie data={data} 
                cx="50%" cy="50%" 
                outerRadius={50 * (props.ratio || 1)} 
                dataKey={"value"} 
                label={renderCustomizedLabel} >
                    {data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={palette[index]} />
                    ))}
                </Pie>
                <Tooltip />
                {!props.noLegend && 
                <Legend layout="vertical" align="right" iconSize={5}/> }
            </PieChart>
        </div>
    )
}


{/* AREAS */}

type AreaProps = {
    title?: string
    w: number
    h: number
    lst: {[key: string]: string | number}[]
    offset?: number
    color: number
    k: string
    cnt: number
}

export function AreaGraph(props: AreaProps) {
    var data: any[] = []
    for (let i = 0; i < props.cnt; i++) {
        data[i] = {
            name: i + (props.offset || 1),
            count: props.lst.filter(x => x[props.k] == i + (props.offset || 1)).length
        }
    }

    return(
        <div>
            <h3>{props.title}</h3>
            <AreaChart width={props.w} height={props.h} data={data}>
                <Tooltip/>
                <XAxis dataKey="name" />
                <YAxis interval={0}/>
                <Area dataKey="count"
                stroke={palette[props.color]} 
                fill={palette[props.color]}/>
            </AreaChart>
        </div>
    )
}

type StackedAreaProps = {
    title?: string
    w: number
    h: number
    lsts: {[key: string]: string | number}[][]
    offset?: number
    categories: any[]
    k: string
    cnt: number
}

export function StackedArea(props: StackedAreaProps) {
    var data: any[] = []
    for (let i = 0; i < props.cnt; i++) {
        const entry: any = { name: i + (props.offset || 1)}
        for (let j = 0; j < props.categories.length; j++) {
            entry[props.categories[j]] = props.lsts[j].filter(x => x[props.k] == i + (props.offset || 1)).length
        }
        data.push(entry)
    }
    
    return(
        <div>
            <h3>{props.title}</h3>
            <AreaChart width={props.w} height={props.h} data={data}>
                <Tooltip/>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 12]}interval={0}/>
                {Array.from({ length: props.categories.length }, (_, i) => i).map((x) => (
                    <Area dataKey={props.categories[x]} 
                    stackId="a" 
                    fill={palette[x]} stroke={palette[x]} />
                ))}
            </AreaChart>
        </div>
    )
}