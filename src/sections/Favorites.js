import '../style/Favorites.css'
import FavoritesList from '../data/Favorites.json'

function Favorites() {
    return (
      <div className="section" id="favorites">
        <h2>a few of my favorite things (recently)</h2>
        <div id="favorite-items">
        {FavoritesList.map((item) => (
          <div className={item.color} id='favorite'>
            <h3><a href={item.link}>{item.title}</a></h3>
            {item.title == "playlist"
            ? <div>
                <iframe src={item.img}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"></iframe>
              </div>
            : <div>
                <img src={item.img}/>
              </div>}
          </div>
        ))}
        </div>
      </div>
    )
  }

export default Favorites;