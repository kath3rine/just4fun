function RatingBar() {
    const items = [
        { cn: "s1", title: 1},
        { cn: "s2", title: 2},
        { cn: "s3", title: 3},
        { cn: "s4", title: 4},
        { cn: "s5", title: 5}
    ]
    return(
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            <h3 style={{ marginTop: "15px" }}>
                click an item to see my thoughts!
            </h3>
            <p style={{ marginLeft: "50px", marginBottom: "0px" }}> 
                my rating (out of 5)
            </p>
            {items.map((item) => (
                <div style={{
                    width: "30px", 
                    margin: "12px", 
                    height: "20px",
                    textAlign: "center", 
                    padding: "3px", 
                    borderRadius: "10px"
                }} 
                className={item.cn}>{item.title}</div>
            ))}
        </div>
    )
}
export default RatingBar;