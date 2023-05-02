export default function AssetsFilter({ filters, activeCat, setChartDataListHandler }:{ filters:string[], activeCat:string, setChartDataListHandler:Function }) {
    const fltrs = filters.map(filter =>
      <li
        key={filter}
        className={filter === activeCat ? 'p-2 rounded-lg text-center text-white bg-black border cursor-pointer' : 'p-2 rounded-lg text-center border cursor-pointer hover:bg-gray-400 hover:border-gray-400'}
        onClick={() => {
          setChartDataListHandler(filter)
        }}
      >
        {filter}
      </li>
    );
    return (
      <ul className="flex justify-center gap-4 text-black m-4">
        {fltrs}
      </ul>
    );
  }