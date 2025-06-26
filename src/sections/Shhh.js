import Data25 from '../data/Data25.json'
import Data24 from '../data/Data24.json'
import Data23 from '../data/Data23.json'
import { AreaGraph, StackedArea, Stacked, Stacked3, PieGraph } from '../components/Charts'

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
    const years = ["2023", "2024", "2025"]
    const lsts = [Data23, Data24, Data25]

    return(
        <div>
            <h2>annual comparison</h2>
            <div style={{display: "flex", flexWrap: "wrap"}}>

            <StackedArea title="age"
                 cnt={8}
                offset={18}
                lsts={lsts}
                categories={years}
                k="age"/>


                <StackedArea title="month"
                 cnt={12}
                lsts={lsts}
                categories={years}
                k="month"/>


                <StackedArea title="duration (# of dates)"
                cnt={5}
                lsts={lsts}
                categories={years}
                k="freq"/>
                
                <Stacked title="gender"
                ratio={0.75}
                domain={[0, 18]}
                lsts={lsts}
                cols={genders}
                categories={years}
                k="gender"/>



                
                <Stacked title="race"
                ratio={0.8}
                domain={[0, 18]}
                lsts={lsts}
                cols={races}
                categories={years}
                k="race"/>


                
                <Stacked title="meeting"
                lsts={lsts}
                domain={[0, 18]}

                ratio={0.75}
                cols={meetings}
                categories={years}
                k="meeting"/>

                <Stacked title="location"
                lsts={lsts}
                domain={[0, 18]}
                cols={locations}
                ratio={0.75}
                categories={years}
                k="location"/>


                <Stacked title="genderswap"
                ratio={0.75}
                domain={[0, 15]}
                lsts={lsts}
                cols={years}
                swap
                categories={genders}
                k="gender"/>

                <Stacked title="raceswap"
                ratio={0.9}
                domain={[0, 15]}
                lsts={lsts}
                swap
                cols={years}
                categories={races}
                k="race"/>

                <Stacked title="meetingswap"
                ratio={0.7}
                domain={[0, 15]}
                lsts={lsts}swap
                cols={years}
                categories={meetings}
                k="meeting"/>
                <Stacked title="location swap"
                ratio={0.75}
                domain={[0, 15]}
                lsts={lsts}swap
                cols={years}
                categories={locations}
                k="location"/>


            </div>
            {data.map((item, index) => (
                <div style={{borderTop: "1px #ddd solid", marginTop: "30px"}}>
                <h2>{item.year} wrapped </h2>
                <p >total: {item.data.length}</p>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>

                    <AreaGraph title="age"
                        fillCol={2-index}
                        lineCol={2-index}
                        lst={item.data}
                        cnt={8}
                        offset={18}
                        k="age"/>

                        <AreaGraph title="month"
                        
                        fillCol={2-index}
                        lineCol={2-index}
                        lst={item.data}
                        cnt={12}
                        k="month"/>


                        <AreaGraph title="duration"
                        lst={item.data}
                        fillCol={2-index}
                        lineCol={2-index}
                        cnt={5}
                        offset={1}
                        k="freq"/>
                        <PieGraph  categories={genders}
                        lst={item.data}
                        ratio={0.75}
                        target="gender"/>

                        <PieGraph  categories={races}
                        lst={item.data}
                        ratio={0.75}
                        target="race"/>



                        <PieGraph  categories={locations}
                        lst={item.data}
                        ratio={0.75}
                        target="location"/>

                        <PieGraph  categories={meetings}

                ratio={0.75}
                        lst={item.data}
                        target="meeting"/>

                    </div>
                </div>
            ))}
            

        </div>
    )
}
export default Shhh