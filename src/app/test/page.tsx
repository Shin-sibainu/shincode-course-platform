export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Tailwind CSS Test</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-gray-700">If you can see styling, Tailwind is working!</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Test Button
        </button>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-red-500 text-white p-4 rounded">Red</div>
        <div className="bg-green-500 text-white p-4 rounded">Green</div>
        <div className="bg-blue-500 text-white p-4 rounded">Blue</div>
      </div>
    </div>
  )
}