const showName = async (name, year) => {
  const resp = await fetch(`http://www.omdbapi.com/?s=${name}&apikey=3e508ddf`)
  // console.log(resp)
  const data = await resp.json()
  console.log(year)
  // console.log(data)
  const movies = data['Search']
  console.log(movies)
  const container = document.getElementsByClassName('cardcontainer')

  movies.forEach(element => {
    container[0].insertAdjacentHTML(
      'afterbegin',
      `<div class="cardcontainer">
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
    )
  })
}

const btn = document.querySelector('.nameSearch')
btn.addEventListener('click', () => {
  const movie_Name = document.getElementById('movie_Name').value
  const movie_Year = document.getElementById('movie_Year').value
  showName(movie_Name, movie_Year)
})
// container.insertAdjacentHtml('afterend'div>ul>)
