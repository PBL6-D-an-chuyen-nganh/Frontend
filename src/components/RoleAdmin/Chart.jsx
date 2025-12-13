import React, { useMemo } from 'react';

export const MonthlySalesChart = ({ data = [] }) => {
  const chartData = useMemo(() => {
    const results = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = d.getMonth() + 1;
      const year = d.getFullYear();

      const foundItem = data.find(item => item.month === month && item.year === year);

      results.push({
        label: `${month}/${year}`,
        displayMonth: getMonthName(month),
        fullYear: year,
        monthValue: month,
        count: foundItem ? foundItem.count : 0
      });
    }
    return results;
  }, [data]);

  const maxDataValue = Math.max(...chartData.map(item => item.count), 0);
  
  const calculateYAxisMax = (val) => {
      if (val === 0) return 10; 
      const step = Math.ceil(val / 4); 
      return Math.ceil((step * 4) / 10) * 10; 
  };

  const yAxisMax = calculateYAxisMax(maxDataValue);
  
  const yAxisTicks = [
      yAxisMax,              
      yAxisMax * 0.75,       
      yAxisMax * 0.5,       
      yAxisMax * 0.25,       
      0                    
  ];

  function getMonthName(month) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[month - 1] || '';
  };

  const getBarHeight = (count) => {
      if (yAxisMax === 0) return 0;
      return (count / yAxisMax) * 100;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm text-gray-500 font-medium">
            {chartData[0]?.displayMonth} {chartData[0]?.fullYear} - {chartData[11]?.displayMonth} {chartData[11]?.fullYear}
        </span>
      </div>

      <div className="relative">
        <div className="flex flex-col justify-between absolute left-0 top-0 bottom-12 text-gray-500 text-sm font-medium h-80">
          {yAxisTicks.map((tick, index) => (
             <div key={index} className="flex items-center">
                 {Math.round(tick)}
             </div>
          ))}
        </div>

        <div className="ml-12">
          <div className="flex items-end justify-between h-80 gap-2 border-b border-gray-200 pb-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {yAxisTicks.slice(0, 4).map((_, i) => (
                    <div key={i} className="w-full border-t border-dashed border-gray-200 h-0"></div>
                ))}
            </div>

            {chartData.map((item, index) => {
              const isCurrentMonth = index === 11;
              
              return (
                <div 
                  key={index} 
                  className="h-full flex-1 flex flex-col items-center justify-end group z-10"
                >
                  <div className="w-full flex justify-center items-end h-full">
                    <div 
                      className={`
                        w-6 sm:w-8 transition-all duration-500 relative rounded-t-sm
                        ${item.count > 0 
                            ? (isCurrentMonth ? 'bg-green-900 hover:bg-green-700' : 'bg-green-900 hover:bg-green-700') 
                            : 'bg-gray-100'
                        } 
                      `}
                      style={{ 
                        height: `${getBarHeight(item.count)}%`,
                        minHeight: item.count > 0 ? '4px' : '0px' 
                      }}
                    >
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-green-900 px-3 py-1 rounded text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg pointer-events-none">
                        <div className="text-center">{item.count}</div>
                        <div className="text-xs text-green-900 font-semibold">{item.displayMonth} {item.fullYear}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-4">
            {chartData.map((item, index) => (
              <div 
                key={index} 
                className={`flex-1 text-center text-xs sm:text-sm font-medium
                    ${index === 11 ? 'text-green-700 font-bold' : 'text-gray-500'}
                `}
              >
                {item.displayMonth}
                {item.displayMonth === 'Jan' && <div className="text-[10px] text-gray-400">{item.fullYear}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};