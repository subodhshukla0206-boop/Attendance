'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Discussion() {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase.from('discussions').select('*').order('created_at', { ascending: false })
    if (error) {
      alert(error.message)
      return
    }

    setPosts(data || [])
  }

  async function createPost() {
    if (!content.trim()) {
      alert('Please write something before posting.')
      return
    }

    const { error } = await supabase.from('discussions').insert([{ content }])
    if (error) {
      alert(error.message)
      return
    }

    setContent('')
    fetchPosts()
  }

  return (
    <div>
      <h2>Discussion</h2>
      <textarea rows={5} value={content} placeholder="Write your message..." onChange={(e) => setContent(e.target.value)} />
      <button onClick={createPost}>Post</button>

      {posts.map((post) => (
        <div key={post.id} className="card">
          {post.content}
        </div>
      ))}
      {posts.length === 0 && <p>No discussion posts yet.</p>}
    </div>
  )
}
