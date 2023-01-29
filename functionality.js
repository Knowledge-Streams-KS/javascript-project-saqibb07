const container = document.querySelector('.cardcontainer')
const movie_Name = document.getElementById('movie_Name')
const movie_Year = document.getElementById('movie_Year')

window.addEventListener('load', () => {
  console.log('on load trigered')
  if (sessionStorage.getItem('%MOVIES_TEXT%')) {
    movie_Name.value = JSON.parse(sessionStorage.getItem('%MOVIES_TEXT%'))
  }
  if (sessionStorage.getItem('%MOVIES_YEAR%')) {
    movie_Year.value = JSON.parse(sessionStorage.getItem('%MOVIES_YEAR%'))
  }
  if (sessionStorage.getItem('%MOVIES_RESULT%')) {
    container.innerHTML = JSON.parse(sessionStorage.getItem('%MOVIES_RESULT%'))
      .map(element => {
        return `<div class="cardcontainer">
        <div class="card">
           <img src="${element['Poster']}" alt="Avatar" style="">
           <div class="container">
           <div class="heading">
              <h4><b>Movie::${element['Title']}</b></h4>
           </div>
           <div class="heading">
              <p>Year::${element['Year']}</p>
           </div>
              </div>
        </div>
       </div>
    `
      })
      .join('')
  } else {
    console.log('there is nothing in session storage')
  }
})

const showName = async (name, year) => {
  const resp = await fetch(`http://www.omdbapi.com/?s=${name}&apikey=3e508ddf`)
  // console.log(resp)
  const data = await resp.json()
  console.log(year)
  // console.log(data)
  const movies = data['Search']
  console.log(movies)

  const moviesFilter = movies.filter(ele => +ele['Year'] >= +year)
  sessionStorage.setItem('%MOVIES_TEXT%', JSON.stringify(name))
  sessionStorage.setItem('%MOVIES_YEAR%', JSON.stringify(year))
  sessionStorage.setItem('%MOVIES_RESULT%', JSON.stringify(moviesFilter))
  const moviesMarkup = moviesFilter.map(element => {
    return `<div class="cardcontainer">
    <div class="card">
       <img src="${element['Poster']}" alt="Avatar" style="">
       <div class="container">
       <div class="heading">
          <h4><b>Movie::${element['Title']}</b></h4>
       </div>
       <div class="heading">   
          <p>Year::${element['Year']}</p>
       </div>
          </div>
    </div>
   </div>   
`
  })

  // console.log('movies markup', typeof movsiesMarkup, moviesMarkup.join('saqib'))

  container.innerHTML = moviesMarkup.join('')
}

const btn = document.querySelector('.nameSearch')
btn.addEventListener('click', () => {
  showName(movie_Name.value, movie_Year.value)
})
// container.insertAdjacentHtml('afterend'div>ul>)
