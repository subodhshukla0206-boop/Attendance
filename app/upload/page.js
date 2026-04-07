'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')

  async function handleUpload() {
    if (!file || !title || !subject) {
      alert('Please provide title, subject, and a file.')
      return
    }

    const { data, error } = await supabase.storage.from('notes').upload(`files/${Date.now()}-${file.name}`, file)
    if (error) {
      alert(error.message)
      return
    }

    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/notes/${data.path}`
    const { error: insertError } = await supabase.from('notes').insert([{ title, subject, file_url: fileUrl }])

    if (insertError) {
      alert(insertError.message)
      return
    }

    alert('Uploaded!')
    setTitle('')
    setSubject('')
    setFile(null)
  }

  return (
    <div>
      <h2>Upload Notes</h2>
      <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="text" value={subject} placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}
