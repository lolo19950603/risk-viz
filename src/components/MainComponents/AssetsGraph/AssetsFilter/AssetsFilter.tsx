export default function AssetsFilter({ filters, activeCat, setChartDataListHandler }:{ filters:string[], activeCat:string, setChartDataListHandler:Function }) {
  const fltrs = filters.map(filter =>
    <li
      key={filter}
      className={filter === activeCat ? 
        'min-w-fit p-4 mb-2 rounded-lg text-center border border-gray-300 text-white bg-amber-500 cursor-pointer' 
        :
        'min-w-fit p-4 mb-2 rounded-lg text-center border border-gray-300 cursor-pointer  hover:bg-amber-500 hover:text-white hover:drop-shadow-2xl transition-all duration-200'}
      onClick={() => {
        setChartDataListHandler(filter)
      }}
    >
      {filter}
    </li>
  );
  return (
    <main>
      <div className="flex justify-center mt-4 mb-2"><b>Assets Name</b></div>
      <div className="m-5">
        <ul className="flex justify-between gap-4 mb-3 text-black overflow-x-auto">
          {fltrs}
        </ul>
      </div>
    </main>
  );
}