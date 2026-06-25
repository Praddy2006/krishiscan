import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">KrishiScan 🌱</h1>
      <p className="text-gray-500 text-lg mb-8">
        AI-powered soil intelligence and crop advisory system
      </p>
      <Link
        to="/scan"
        className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition"
      >
        Start a Soil Scan
      </Link>
    </div>
  )
}