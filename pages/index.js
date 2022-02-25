import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Fuse from 'fuse.js'
import Composers from '../components/composers.js'

export default function Home() {
  const [results, setResults] = useState([]);

  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
      "name",
    ]
  };
  
  const composers = Composers.map(e => ({'name': e[0], 'born': e[1], 'death': e[2], 'style': e[3]}));

  const fuse = new Fuse(composers, options);

  function handleChange(event) {
    const pattern = event.target.value;
    if (pattern.length >= 3) {
      setResults(fuse.search(pattern));
    } else {
      setResults([]);
    }
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Composers</title>
        <meta name="description" content="Composers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <input type="text" onChange={handleChange} />
      {results.map(e => <li key={e.refIndex}>{e['item'].name} ({e['item'].born} - {e['item'].death}) [{e['item'].style}]</li>)}
      </main>
    </div>
  )
}
