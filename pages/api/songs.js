import { GraphQLSchema, graphql, buildSchema, printSchema } from "graphql";
import axios from "axios"

export default async (req, res) => {

  const songs = await axios.get('https://raw.githubusercontent.com/evangelik/svita-songs/master/svita.json')
    .then(async (data) => data.data)
    .catch((error) => {
      console.log(error)
    })

  const schema = buildSchema(`
    type Query {
      getSongsList(name: String): [Song]
      getSong(id: Int): [Song]
    }
    type Song {
      id: Int
      name: String
      sections: [Section]
      authors: [Author]
      illustration: Illustration
      prevSong: Song,
      nextSong: Song
    }
    type Author {
      firstName: String
      lastName: String
    }
    type Illustration {
      name: String
      size: String
    }
    type Section {
      type: String
      verseIndex: Int
      paragraphs: [String]
    }
  `)

  const resolvers = {
    getSongsList: atts => atts.length ? songs.filter(song => song.name === atts.name) : songs,
    getSong: atts => songs.filter(song => song.id === atts.id).map(song => ({}))
  }

  const query = req.body.query;

  const response = await graphql(schema, query, resolvers);
  return res.end(JSON.stringify(response));
};