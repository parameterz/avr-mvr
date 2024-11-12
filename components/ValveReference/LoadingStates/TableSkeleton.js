// components/ValveReference/LoadingStates/TableSkeleton.js
export default function TableSkeleton() {
    return (
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="grid grid-cols-5 gap-4 p-4 border-b">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
        
        {/* Rows skeleton */}
        {[...Array(5)].map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="grid grid-cols-5 gap-4 p-4 border-b"
          >
            {[...Array(5)].map((_, colIndex) => (
              <div 
                key={colIndex} 
                className={`h-4 bg-gray-200 rounded ${
                  colIndex === 0 ? 'w-3/4' : 'w-1/2'
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  }