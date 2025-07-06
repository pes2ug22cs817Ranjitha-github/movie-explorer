export default function Loading() {
  return (
    <div className="p-4 max-w-3xl mx-auto animate-pulse">
      <div className="h-10 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="w-full h-[500px] bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
    </div>
  );
}
