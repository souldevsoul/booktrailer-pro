export const dynamic = "force-dynamic"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/30 to-gray-50/30 flex items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="text-6xl">🎬✨</div>
        <h1 className="text-4xl font-display font-bold text-slate-900">Dashboard Coming Soon</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Create and manage your book trailers - coming soon!
        </p>
        <a href="/" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl shadow-cinema-lg hover:scale-105 transition-transform duration-300">
          Back to Home
        </a>
      </div>
    </div>
  )
}
