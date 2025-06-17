import React from 'react'

const Card = ({data}) => {
  const readMore = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
     
  return (
    <div className='cardContainer'>
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null
        } else {
          return (
            <div className='card' key={index}>
              <img 
                src={curItem.urlToImage} 
                alt={curItem.title}
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400'
                }}
              />
              <div className='content'>
                <a 
                  className='title' 
                  onClick={() => window.open(curItem.url, '_blank', 'noopener,noreferrer')}
                >
                  {curItem.title}
                </a>
                <p>{curItem.description}</p>
                <button onClick={() => window.open(curItem.url, '_blank', 'noopener,noreferrer')}>
                  Read More
                </button>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Card