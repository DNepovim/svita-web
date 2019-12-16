import React from "react"
import axios from "axios"
import Link from "next/link"


const App = props =>
  <main>
    <h1>Zpěvník Svítá</h1>
    <ul>
      {props.getSongsList.map(song =>
        <li key={song.id}><Link href={`/song?id=${song.id}`} as={`${song.id}`}><a>{song.id}. {song.name}</a></Link></li>
      )}
    </ul>
  </main>

App.getInitialProps = async () => {
  const query = `
    {
      getSongsList {
        id, name
      }
    }
  `
  const response = await axios.post(`http://localhost:3000/api/songs`, { query })
  return { ...response.data.data }
};

export default App