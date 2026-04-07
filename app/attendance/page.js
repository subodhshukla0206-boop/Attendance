'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Attendance() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchAttendance()
  }, [])

  async function fetchAttendance() {
    const { data, error } = await supabase.from('attendance').select('*').order('date', { ascending: false })
    if (error) {
      alert(error.message)
      return
    }

    setRecords(data || [])
  }

  async function mark(status) {
    const { error } = await supabase.from('attendance').insert([{ date: new Date().toISOString(), status }])
    if (error) {
      alert(error.message)
      return
    }

    fetchAttendance()
  }

  return (
    <div>
      <h2>Attendance</h2>
      <button onClick={() => mark('Present')}>Present</button>
      <button onClick={() => mark('Absent')}>Absent</button>

      {records.map((record) => (
        <div key={record.id} className="card">
          {record.status} - {new Date(record.date).toDateString()}
        </div>
      ))}
      {records.length === 0 && <p>No attendance records yet.</p>}
    </div>
  )
}
