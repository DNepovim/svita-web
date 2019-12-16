import React from "react"
import axios from "axios"


const Song = props =>
  <main>
    <h1>{props.id}. {props.name}</h1>
    <p>{props.authors.map(author => `${author.firstName} ${author.lastName}`).join(', ')}</p>
    {props.sections.map(section =>
      <p>
        {section.type === 'verse' ? <span>{section.verseIndex}: </span> : <span>R: </span>}
        {section.paragraphs.map(paragraph => <>{paragraph}<br/></>)}</p>
    )}
  </main>


Song.getInitialProps = async (atts) => {
  const query = `
    {
      getSong(id: ${atts.query.id}) {
        id,
        name,
        sections { type, verseIndex, paragraphs},
        authors { firstName, lastName }
      }
    }
  `
  const response = await axios.post(`http://localhost:3000/api/songs`, { query })
  return response.data.data.getSong[0]
};

export default Song