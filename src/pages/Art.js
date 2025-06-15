import '../style/Art.css'
import Notebook from '../components/Notebook.js'
import TraditionalArt from '../components/TraditionalArt.js'
import DigitalArt from '../components/DigitalArt.js'

function Art() {
    return(
        <div className="section" id="art">
            <h2>art</h2>
            <div id="notebooks">
                <TraditionalArt/>
                <DigitalArt/>
            </div>
        </div>
    )
}
export default Art