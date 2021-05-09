// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')
const { stringify } = require('querystring')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Error: Please enter year and genre` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

    for (let i=0; i < moviesFromCsv.length; i++) {
      // store movies in memory  
      let movies = moviesFromCsv[i]

      // create if loop for all movies with specified year and genre (using user inputted year and genre)

      // genre assumes to include other genres as well 

      if(year == movies.startYear && movies.genres.includes(genre) && movies.runtimeMinutes != `\\N` && movies.genres != `\\N`) { 

      // add number of results to the returnValue 
      
      returnValue.numResults = returnValue.numResults + 1

      // create object to hold movies array detail

      let postObject = {
        title: movies.primaryTitle,
        year: movies.startYear,
        genre: movies.genres
      }

      // add results from if loop of to the movies array including primary title, year movie release, movie genres 
      
      returnValue.movies.push(postObject)

      }
    }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(returnValue) // a string of data
    }
  }
  
}