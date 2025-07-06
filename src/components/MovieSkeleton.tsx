export default function MovieSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow p-2">
      <div className="bg-gray-300 w-full h-[450px] rounded" />
      <div className="h-4 bg-gray-300 mt-3 rounded w-3/4" />
      <div className="h-3 bg-gray-200 mt-2 rounded w-1/2" />
    </div>
  );
}
