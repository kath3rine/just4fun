import Data25 from '../data/Data25.json'
import Data24 from '../data/Data24.json'
import Data23 from '../data/Data23.json'
import MyPie from '../charts/MyPie';
import BarGraph from '../charts/BarGraph';
import StackedBarGraph from '../charts/StackedBarGraph';

function Shhh() {
    function Testing() {
        return(<p>hi</p>)
    }
    const w = 320;
    const h = 300;
    const palette = [
        'rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6"
    ];
    const locations = [
        "restaurant", "bar", "cafe", "activity"
    ]
    const meetings = [
        "hinge", "tinder", "bar", "mutual"
    ]
    const races = [
        "white", "mixed", "me/sa", "asian", "hispanic"
    ]
    const data = [
        { data: Data25, year: 2025 },
        { data: Data24, year: 2024 },
        { data: Data23, year: 2023 },
    ]
    return(
        <div>
            {data.map((item, index) => (
                <div style={{borderTop: "1px #ddd solid", marginTop: "30px"}}>
                <h2>{item.year} wrapped </h2>
                <p >total: {item.data.length}</p>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <MyPie palette={palette}
                    categories={["M", "F"]}
                    w={w} h={h} 
                    lst={item.data} 
                    k="gender"/>
        
                    <MyPie palette={palette} 
                    categories={meetings}
                    w={w} h={h} 
                    lst={item.data} 
                    k="meeting"/>
        
                    <MyPie palette={palette} 
                    categories={locations}
                    w={w} h={h} 
                    lst={item.data} 
                    k="location"/>
        
                    <MyPie palette={palette} 
                    categories={races}
                    w={w} h={h} 
                    lst={item.data} 
                    k="race"/>
        
                    <BarGraph title="age" 
                    w={w} h={h/2}
                    col={palette[index]} 
                    lst={item.data} 
                    k="age"
                    keys={Array.from({ length: 8 }, (_, i) => 18 + i)}/>
        
                    <StackedBarGraph cols={palette}
                        keys={Array.from({ length: 12 }, (_, i) => i + 1)} 
                        xaxis="month" 
                        k="month"
                        lst={item.data} 
                        target="meeting" 
                        bars={meetings} 
                        w={w} h={h/2}
                        title="month + method met" />
        
                    <BarGraph title="# of dates" 
                    w={w} h={h/2}
                    col={palette[index]} 
                    lst={item.data} 
                    k="freq"
                    keys={Array.from({ length: 5 }, (_, i) => 1 + i)}/>
                </div>
                </div>
            ))}
            

        </div>
    )
}
export default Shhh