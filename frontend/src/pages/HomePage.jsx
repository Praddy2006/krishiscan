import { Link } from 'react-router-dom'

const SOIL_TYPES = [
  { name: 'Alluvial', color: 'bg-amber-100 text-amber-800 border-amber-200', desc: 'Fertile, found near rivers' },
  { name: 'Black',    color: 'bg-gray-800 text-gray-100 border-gray-700',    desc: 'Rich in clay, moisture retentive' },
  { name: 'Red',      color: 'bg-red-100 text-red-800 border-red-200',       desc: 'Iron-rich, well drained' },
  { name: 'Laterite', color: 'bg-orange-100 text-orange-800 border-orange-200', desc: 'Hard, leached of nutrients' },
  { name: 'Sandy',    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', desc: 'Loose, fast draining' },
]

const FEATURES = [
  { icon: '🪨', title: 'Soil Identification',  desc: 'Upload a soil photo and our AI instantly classifies it into one of 5 major Indian soil types.' },
  { icon: '🌾', title: 'Crop Advisory',        desc: 'Get crop recommendations tailored to your exact soil type, pH, drainage, and nutrient profile.' },
  { icon: '🐛', title: 'Pest Detection',       desc: 'Identify insects in your soil — know which are beneficial and which need immediate action.' },
  { icon: '💬', title: 'Farming Assistant',    desc: 'Ask our AI assistant anything about farming, weather, seasons, and best agricultural practices.' },
]

const STATS = [
  { value: '5+',    label: 'Soil Types Detected' },
  { value: '50+',   label: 'Crop Recommendations' },
  { value: '95%',   label: 'Model Accuracy' },
  { value: '100%',  label: 'Free to Use' },
]

export default function HomePage() {
  return (
    <div className="space-y-16">

      {/* Hero */}
      <div className="text-center pt-10 pb-6">
        <span className="inline-block bg-forest-100 text-forest-700 text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-widest uppercase border border-forest-200">
          AI-Powered Agriculture
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-forest-800 leading-tight mb-5">
          Know Your Soil.<br />
          <span className="text-earth-500">Grow Better Crops.</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Upload a photo of your soil and get instant AI-powered insights — soil type classification, personalised crop recommendations, and soil health analysis.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/scan" className="bg-forest-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-forest-500 transition shadow-md shadow-forest-900/20">
            Start a Soil Scan →
          </Link>
          <Link to="/chat" className="bg-earth-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-earth-500 transition shadow-md shadow-earth-900/20">
            💬 Ask Farm Assistant
          </Link>
          <Link to="/history" className="bg-white text-gray-700 px-7 py-3.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition">
            View History
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ value, label }) => (
          <div key={label} className="bg-white rounded-2xl border border-earth-100 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-forest-700">{value}</p>
            <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold text-forest-800 mb-6 text-center">Everything you need to farm smarter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-earth-100 p-6 shadow-sm hover:shadow-md hover:border-forest-200 transition">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1.5">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Soil types */}
      <div className="bg-white rounded-2xl border border-earth-100 p-7 shadow-sm">
        <h2 className="text-lg font-bold text-forest-800 mb-1">Soil types we detect</h2>
        <p className="text-sm text-gray-400 mb-5">Our model is trained on major Indian soil categories</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {SOIL_TYPES.map(({ name, color, desc }) => (
            <div key={name} className={`rounded-xl border px-4 py-3 ${color}`}>
              <p className="font-semibold text-sm">{name}</p>
              <p className="text-xs mt-0.5 opacity-70">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-forest-800 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to scan your soil?</h2>
        <p className="text-forest-300 text-sm mb-5">It takes less than 30 seconds. No account needed to get started.</p>
        <Link to="/scan" className="inline-block bg-white text-forest-800 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-earth-50 transition">
          Start Free Scan →
        </Link>
      </div>

    </div>
  )
}