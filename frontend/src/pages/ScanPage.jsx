import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function ScanPage() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()
  const navigate = useNavigate()

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setError(null)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  async function handleSubmit() {
    if (!image) return
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', image)
      const res = await api.post('/scans/soil', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      navigate(`/result/${res.data.scanId}`)
    } catch (err) {
      setError('Scan failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Scan your soil</h2>
      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileRef.current.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${
          dragOver ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-lg object-cover" />
        ) : (
          <div className="text-gray-400">
            <p className="text-sm">Drag and drop a soil image here</p>
            <p className="text-xs mt-1">or click to browse</p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={!image || loading}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition"
      >
        {loading ? 'Analysing...' : 'Analyse Soil'}
      </button>
    </div>
  )
}