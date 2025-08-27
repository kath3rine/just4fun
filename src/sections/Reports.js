import Data from "../data/Report.json"
import MayEating from "../assets/reports/may-eating.jpeg"
import JunEating from "../assets/reports/jun-eating.jpg"
import JulEating from "../assets/reports/jul-eating.png"
import AugEating from "../assets/reports/aug-eating.png"

function ReportItem({item, i, index}) {
    const starts = ["R", "E", "P", "O", "R", "T"]
    const titles = ["EADING", "XPERIENCING", "LAYING", "BSESSING", "ECOMMENDING", "REATING"]
    const eData = { 3: MayEating, 2: JunEating, 1: JulEating, 0: AugEating}
    return (
        <div style={{ 
            display: "flex",
            borderTop: "1px #bbb solid",
            marginBottom: "30px",
            height: "auto"
        }}>

            <div style={{ 
                fontWeight: "bold",
                fontSize: "45px",
                marginRight: "10px",
                marginTop: "0px" 
            }}>
                {starts[index]}
            </div>
            
            { index == 2
                ? <div>
                    <div style={{ fontWeight: "bold", marginTop: "10px"}}>
                        {titles[index]}
                    </div>
                    { item.link && <iframe src={item.link} 
                    style={{ height: "152px", width: "290px", 
                    opacity: "0.8", 
                    marginTop: "10px",
                    opacity: "0.75",
                    borderRadius: "20px" }}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"></iframe> }
                </div>
                : <div style={{ display: "flex", width: "255px", textWrap: "wrap", flexWrap: "wrap"}}>
                    <div>    
                        <div style={{ fontWeight: "bold", marginTop: "10px"}}>
                            {titles[index]}
                        </div>
                        {item.item && <div style={{marginTop: "5px"}}>
                            {item.item}
                        </div> }
                        {item.details && <div style={{opacity: "0.5", textWrap: "wrap"}}>
                            {index == 0 && "by "}{index == 1 && "@ " }{index == 3 && "from " }{index == 4 && "("}{item.details}{index == 4 && ")"}
                        </div> }
                    </div> 
                    { i in eData && index == 5 && 
                        <img src={eData[i]}
                        style={{
                            height: "85px", 
                            width: "65px",
                            marginLeft: "20px", 
                            marginTop: "10px",
                            position: "absolute", 
                            right: "20px"
                        }}/>
                    }
                    { item.link && index != 2 && <img src={item.link}
                    style={{
                        height: "85px", 
                        width: "65px",
                        marginLeft: "20px", 
                        marginTop: "10px",
                        position: "absolute", 
                        right: "20px"
                    }}/> }
                </div>
            }
        </div>
    )
}

function Report({report, i}) {
    return (
        <div style={{ 
            marginBottom: "30px",
            marginRight: "30px", 
            width: "350px",
            padding: "10px",
            filter: "drop-shadow(5px 10px 5px #bbb)"  
        }} 
        className="s3">
            <h3 style={{textAlign: "center", margin: "10px"}}>
                {report.month}
            </h3>
            <div style={{
            }}>
            {report.items.map((item, index) => (
                <ReportItem 
                i={i}
                item={item} 
                index={index} />
            ))}
            </div>
        </div>
    )
}

function Reports() {
    return (
        <div>
            <h2>monthly REPORTs</h2>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {Data.map((report, i) => 
                    <Report report={report} i={i}/>
                )}
            </div>
        </div>
    )
}

export default Reports