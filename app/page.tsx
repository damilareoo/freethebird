export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-sky-light">
      <h1 className="text-3xl font-bold mb-4 text-freedom-primary">Free the Bird</h1>
      <p className="text-center mb-8 text-cage-dark">Solve brain teasers to free the caged bird!</p>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <p className="text-center">The game is currently being updated. Please check back soon!</p>
      </div>
    </main>
  )
}
