import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-green-700">
          🌱 KrishiScan
        </Link>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="/scan" className="hover:text-green-700">Scan Soil</Link>
          <Link to="/history" className="hover:text-green-700">History</Link>
          <Link to="/login" className="hover:text-green-700">Login</Link>
        </div>
      </div>
    </nav>
  )
}