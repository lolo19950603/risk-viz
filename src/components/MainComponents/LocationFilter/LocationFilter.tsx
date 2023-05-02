export default function LocationFilter({ filters, activeLocation, setActiveLocationHandler }:{ filters:number[][], activeLocation:number[], setActiveLocationHandler:Function }) {
  const fltrs = filters.map(filter =>
    <li
      key={filter.toString()}
      className={Number(filter[0]) === activeLocation[0] && Number(filter[1]) === activeLocation[1] ? 
        'p-4 rounded-lg text-center border border-gray-300 text-white bg-amber-500 cursor-pointer' 
        :
        'p-4 rounded-lg text-center border border-gray-300 cursor-pointer  hover:bg-amber-500 hover:text-white hover:drop-shadow-2xl transition-all duration-200'}
      onClick={() => {
        setActiveLocationHandler([Number(filter[0]), Number(filter[1])])
      }}
    >
      {filter.toLocaleString()}
    </li>
  );
  return (
    <main>
      <div className="flex justify-center mt-4 mb-2">Location</div>
      <ul className="flex justify-center gap-4 mb-5 text-black hover:overflow-x-scroll">
        {fltrs}
      </ul>
    </main>
  );
}