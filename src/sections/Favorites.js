import FavoritesList from '../data/Favorites.json'

function Favorites() {
    return (
      <div className="section" 
      style={{ 
        borderTop: "1px #ddd solid", marginTop: "30px"
      }}>
        <h2>a few of my favorite things (recently)</h2>
        <div style={{ 
          display: "flex", flexWrap: "wrap", flexDirection: "row"
        }}>
        {FavoritesList.map((item) => (
          <div className={item.color} 
          style={{ 
            width: "240px", 
            height: "100%", 
            padding: "5px",
            margin: "10px 20px 10px 0px", 
            textAlign: "center",

            filter: "drop-shadow(5px 10px 5px #bbb)"
          }}>
            <h3><a href={item.link}>{item.title}</a></h3>
            {item.title == "playlist" 
            ? <div>
                <iframe src={item.img} 
                style={{ height: "352px", width: "230px", 
                opacity: "0.8", 
                borderRadius: "20px" }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"></iframe>
              </div>
            : item.title == "song"
              ? <iframe src={item.img} 
                style={{ height: "152px", width: "230px", 
                opacity: "0.8", 
                borderRadius: "20px" }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"></iframe>
              : <div>
                <img src={item.img} 
                style={{ 
                  width: "70%", 
                  opacity: "0.9", 
                  borderRadius: "10px" 
                  }}/>
              </div>}
          </div>
        ))}
        </div>
      </div>
    )
  }

export default Favorites;