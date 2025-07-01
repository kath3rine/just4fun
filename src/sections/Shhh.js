import Data25 from '../data/Data25.json'
import Data24 from '../data/Data24.json'
import Data23 from '../data/Data23.json'
import { AreaGraph, StackedArea, Stacked, Stacked3, PieGraph } from '../components/Charts'

function Shhh() {
    const genders = ["F", "M"]
    const locations = [ "activity", "bar", "cafe", "restaurant"  ]
    const meetings = [ "bar", "hinge",  "mutual", "tinder" ]
    const races = [ "asian", "hispanic", "me/sa", "mixed", "white",  ]
    const data = [
        { data: Data25, year: 2025 },
        { data: Data24, year: 2024 },
        { data: Data23, year: 2023 },
    ]
    const years = ["2023", "2024", "2025"]
    const lsts = [Data23, Data24, Data25]

    const stackedAreaData = [
        { title: "age", cnt: 8, k: "age", offset: 18 },
        { title: "month", cnt: 12, k: "month" },
        { title: "duration (# of dates)", cnt: 5, k: "freq"}
    ]

    const stacked1Data = [
        { title: "gender", ratio: 0.75, cols: genders, k: "gender"},
        { title: "race", ratio: 0.8, cols: races, k: "race"},
        { title: "how we met", ratio: 0.75, cols: meetings, k: "meeting"},
        { title: "first date location", ratio: 0.75, cols: locations, k: "location"}
    ]

    const stacked2Data = [
        { title: "age", ratio: 0.75, categories: genders, k: "gender"},
        { title: "race", ratio: 0.9, categories: races, k: "race"},
        { title: "how we met", ratio: 0.7, categories: meetings, k: "meeting"},
        { title: "location", ratio: 0.75, categories: locations, k: "location"},
    ]

    const areaData = [
        { title: "age", cnt: 8, offset: 18, k: "age"},
        { title: "month", cnt: 12, k: "month"},
        { title: "duration", cnt: 5, k: "freq"}
    ]

    const pieData = [
        { categories: genders, target: "gender" },
        { categories: races, target: "race" },
        { categories: locations, target: "location" },
        { categories: meetings, target: "meeting" }
    ]

    return(
        <div>
            <h2>annual comparison</h2>
            <div style={{display: "flex", flexWrap: "wrap", textAlign: "center"}}>

            { stackedAreaData.map((item) => (
                <StackedArea title={item.title} 
                cnt={item.cnt}
                offset={item.offset}
                lsts={lsts}
                categories={years}
                k={item.k}/>
            ))}

            { stacked1Data.map((item) => (
                <Stacked title={item.title}
                ratio={item.ratio}
                domain={[0, 20]}
                lsts={lsts}
                cols={item.cols}
                categories={years}
                k={item.k}/>
            ))}

            { stacked2Data.map((item) => (
                <Stacked title={item.title}
                ratio={item.ratio}
                domain={[0, 16]}
                lsts={lsts}
                cols={years}
                swap
                categories={item.categories}
                k={item.k}/>
            ))}

            </div>
            {data.map((item, index) => (
                <div style={{borderTop: "1px #ddd solid", margin: "00px"}}>
                <h2>{item.year} wrapped </h2>
                <p >total: {item.data.length}</p>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>

                        { areaData.map((item2) => (
                            <AreaGraph title={item2.title}
                            fillCol={2-index}
                            lineCol={2-index}
                            offset={item2.offset}
                            lst={item.data}
                            cnt={item2.cnt}
                            k={item2.k}/>
                        ))}

                        { pieData.map((item2) => (
                            <PieGraph categories={item2.categories}
                            lst={item.data}
                            ratio={.75}
                            target={item2.target}/>
                        ))}

                    </div>
                </div>
            ))}
            

        </div>
    )
}
export default Shhh