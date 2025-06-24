import Data25 from '../data/Data25.json'
import Data24 from '../data/Data24.json'
import Data23 from '../data/Data23.json'
import MyPie from '../charts/MyPie';
import BarGraph from '../charts/BarGraph';
import StackedBarGraph from '../charts/StackedBarGraph';

function Wrapped({data, palette, col, w, h, y}) {
    return(
    <div style={{borderTop: "1px #ddd solid", marginTop: "30px"}}>
        <h2>{y} wrapped </h2>
        <p >total: {data.length}</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
            <MyPie palette={palette}
            categories={["M", "F"]}
            w={w} h={h} lst={data} k="gender"/>

            <MyPie palette={palette} 
            categories={["hinge", "tinder", "bar", "mutual"]}
            w={w} h={h} lst={data} k="meeting"/>

            <MyPie palette={palette} 
            categories={["restaurant", "bar", "cafe", "activity"]}
            w={w} h={h} lst={data} k="location"/>

            <MyPie palette={palette} 
            categories={["white", "mixed", "me/sa", "asian", "hispanic"]}
            w={w} h={h} lst={data} k="race"/>

            <BarGraph title="age" w={w} h={h}
            col={col} 
            lst={data} k="age"
            keys={Array.from({ length: 8 }, (_, i) => 18 + i)}/>

            <StackedBarGraph cols={palette}
                keys={Array.from({ length: 12 }, (_, i) => i + 1)} xaxis="month" k="month"
                lst={data} target="meeting" bars={["hinge", "tinder", "bar", "mutual"]} w={w} h={h}
                title="month + method met" />

            <BarGraph title="# of dates" w={w} h={h}
            col={col} 
            lst={data} k="freq"
            keys={Array.from({ length: 5 }, (_, i) => 1 + i)}/>
        </div>
        </div>
)}

function Shhh() {
    const w = 320;
    const h = 300;
    const COLORS = ['rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6", "#ddd"];
    return(
        <div>
            <Wrapped data={Data25} w={w} h={h} y={2025}
            palette={COLORS} col={COLORS[0]}/>
            <Wrapped data={Data24} w={w} h={h} y={2024}
            palette={COLORS} col={COLORS[1]}/>
            <Wrapped data={Data23} w={w} h={h} y={2023}
            palette={COLORS} col={COLORS[2]}/>
        </div>
    )
}
export default Shhh