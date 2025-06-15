import TraditionalArt from '../components/TraditionalArt.js';
import DigitalArt from '../components/DigitalArt.js';
import Programming from '../components/Programming.js';

function Create() {
    return (
        <div className="section" id="create">
                <TraditionalArt/>
                <DigitalArt/>
                <Programming/>
        </div>
    )
}
export default Create