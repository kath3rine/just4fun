import Data25 from '../data/Data25.json'
import Data24 from '../data/Data24.json'
import Data23 from '../data/Data23.json'
import { PieGraph, GradientBarGraph, StackedNum, AreaGraph } from '../components/Charts';


function Shhh() {
    const genders = ["M", "F"]
    const locations = [ "restaurant", "bar", "cafe", "activity" ]
    const meetings = [ "hinge", "tinder", "bar", "mutual" ]
    const races = [ "white", "mixed", "me/sa", "asian", "hispanic" ]
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

                    <PieGraph  categories={genders}
                    lst={item.data}
                    target="gender"/>

                    <PieGraph  categories={locations}
                    lst={item.data}
                    target="location"/>

                    <PieGraph  categories={races}
                    lst={item.data}
                    target="race"/>

                    <PieGraph  categories={meetings}
                    lst={item.data}
                    target="meeting"/>

                    <AreaGraph lst={item.data}
                    target="age"
                    xaxis={Array.from({ length: 8 }, (_, i) => 18 + i)}
                    title="age"/>

                    <GradientBarGraph title="duration (# of dates)"
                    lst={item.data} 
                    target="freq"/>

                    <StackedNum title="month + method"
                    lsts={item.data}
                    categories={meetings}
                    target="meeting"
                    k="month"
                    cnt={12}/>
        
                </div>
                </div>
            ))}
            

        </div>
    )
}
export default Shhh