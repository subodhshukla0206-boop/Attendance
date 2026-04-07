'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false })
    if (error) {
      alert(error.message)
      return
    }

    setNotes(data || [])
  }

  return (
    <div>
      <h2>Notes Feed</h2>
      {notes.map((note) => (
        <div key={note.id} className="card">
          <h3>{note.title}</h3>
          <p>{note.subject}</p>
          <a href={note.file_url} target="_blank" rel="noreferrer">
            Download
          </a>
        </div>
      ))}
      {notes.length === 0 && <p>No notes uploaded yet.</p>}
    </div>
  )
}
