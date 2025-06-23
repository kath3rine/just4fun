import '../style/RatingBar.css'

function RatingBar() {
    const items = [
        { cn: "s1", title: 1},
        { cn: "s2", title: 2},
        { cn: "s3", title: 3},
        { cn: "s4", title: 4},
        { cn: "s5", title: 5}
    ]
    return(
        <div id="rating-bar">
            <h3>click an item to see my thoughts!</h3>
            <p> my rating (out of 5)</p>
            {items.map((item) => (
                <div className={item.cn}>{item.title}</div>
            ))}
        </div>
    )
}
export default RatingBar;