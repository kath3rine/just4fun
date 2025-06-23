import GenreChart from "../charts/GenreChart"
import TimelineChart from "../charts/TimelineChart"
import Data from '../data/Data.json'
function Shhh() {
    const shhhStyle = {
        display: "flex",
        flexWrap: "wrap"
    }

    const COLORS = ['rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6", "#ddd"];
    return(
        <div style={shhhStyle}>
            <TimelineChart lst={Data} 
            title="# of first dates per month"
            w={300} h={300} field="meetingMonth"/>

            <GenreChart lst={Data} palette={COLORS}
            w={300} h={300} 
            field="meeting"
            keys={["tinder", "hinge"]}/>

            <GenreChart lst={Data} palette={COLORS}
            w={300} h={300} 
            field="location"
            keys={["bar", "restaurant", "activity"]}/>

            <GenreChart lst={Data} palette={COLORS}
            w={300} h={300} 
            field="gender"
            keys={["M", "F"]}/>

            <TimelineChart lst={Data} 
            title="age"
            w={300} h={300} field="age"/>
        </div>
    )
}
export default Shhh