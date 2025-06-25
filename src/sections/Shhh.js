import Data25 from '../data/Data25.json'
import Data24 from '../data/Data24.json'
import Data23 from '../data/Data23.json'
import {PieGraph} from '../charts/Pies'
import { AreaGraph } from '../charts/Areas'
import { BarGraph } from '../charts/Bars'

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

                        <AreaGraph title="age"
                        fillCol={0}
                        lineCol={1}
                        lst={item.data}
                        cnt={8}
                        offset={18}
                        k="age"/>

                        <AreaGraph title="duration"
                        lst={item.data}
                        fillCol={0}
                        lineCol={1}
                        cnt={5}
                        offset={1}
                        k="freq"/>
                    </div>
                </div>
            ))}
            

        </div>
    )
}
export default Shhh