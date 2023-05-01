export default function LocationFilter({ filters, activeLocation, setActiveLocationHandler }:{ filters:number[][], activeLocation:number[], setActiveLocationHandler:Function }) {
  const fltrs = filters.map(filter =>
    <li
      key={filter.toString()}
      className={Number(filter[0]) === activeLocation[0] && Number(filter[1]) === activeLocation[1] ? 'p-2 rounded-lg text-center text-white bg-black border cursor-pointer' : 'p-2 rounded-lg text-center border cursor-pointer hover:bg-gray-400 hover:border-gray-400'}
      onClick={() => {
        setActiveLocationHandler([Number(filter[0]), Number(filter[1])])
      }}
    >
      {filter}
    </li>
  );
  return (
    <ul className="flex justify-center gap-4 text-black p-0 m-8">
      {fltrs}
    </ul>
  );
}