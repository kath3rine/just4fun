import FavoritesList from '../data/Favorites.json'

function Favorites() {
    return (
      <div className="section" 
      style={{ 
        borderTop: "1px #ddd solid", marginTop: "30px"
      }}>
        <h2>a few of my favorite things (recently)</h2>
        <div style={{ 
          display: "flex", flexWrap: "wrap" 
        }}>
        {FavoritesList.map((item) => (
          <div className={item.color} 
          style={{ 
            width: "300px", 
            height: "100%", 
            padding: "10px",
            margin: "10px 10px 10px 0px", 
            textAlign: "center", 
            borderRadius: "10px"
          }}>
            <h3><a href={item.link}>{item.title}</a></h3>
            {item.title == "playlist"
            ? <div>
                <iframe src={item.img} 
                style={{ height: "400px", opacity: "0.8", borderRadius: "10px" }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"></iframe>
              </div>
            : <div>
                <img src={item.img} 
                style={{ width: "100%", opacity: "0.9", borderRadius: "10px" }}/>
              </div>}
          </div>
        ))}
        </div>
      </div>
    )
  }

export default Favorites;