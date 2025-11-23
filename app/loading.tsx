export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="space-y-8 animate-pulse">
        <div className="h-12 bg-muted rounded w-64"></div>
        <div className="h-6 bg-muted rounded w-96"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-video bg-muted rounded"></div>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
