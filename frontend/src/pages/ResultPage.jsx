import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

export default function ResultPage() {
  const { scanId } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['scan', scanId],
    queryFn: () => api.get(`/scans/${scanId}`).then(r => r.data),
  })

  if (isLoading) return <p className="text-gray-500 text-sm">Loading results...</p>
  if (error) return <p className="text-red-500 text-sm">Failed to load result.</p>

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Scan Result</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Soil type detected</p>
        <p className="text-2xl font-bold text-green-700">{data.soilType}</p>
        <p className="text-sm text-gray-500 mt-1">Confidence: {Math.round(data.confidence * 100)}%</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Soil health overview</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-800">{data.health?.phRange}</p>
            <p className="text-xs text-gray-400 mt-1">pH range</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">{data.health?.drainage}</p>
            <p className="text-xs text-gray-400 mt-1">Drainage</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">{data.health?.nutrients}</p>
            <p className="text-xs text-gray-400 mt-1">Nutrients</p>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Recommended crops</p>
        <div className="flex flex-wrap gap-2">
          {data.crops?.map((crop) => (
            <span key={crop} className="bg-green-50 text-green-800 text-sm px-3 py-1 rounded-full border border-green-200">
              {crop}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}