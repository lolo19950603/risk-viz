export default function DecadeFilter({ filters, activeDecade, setActiveDecade, setAssetsHandler }:{ filters:number[], activeDecade:number, setActiveDecade:Function, setAssetsHandler:Function }) {
  const fltrs = filters.map(filter =>
    <li
      key={filter}
      className={filter === activeDecade ? 'p-2 rounded-lg text-center text-white bg-black border cursor-pointer' : 'p-2 rounded-lg text-center border cursor-pointer hover:bg-gray-400 hover:border-gray-400'}
      onClick={() => {
        setActiveDecade(filter)
        setAssetsHandler(filter)
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