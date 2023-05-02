export default function DecadeFilter({
  filters,
  activeDecade,
  setActiveDecade,
  setAssetsHandler,
}: {
  filters: number[];
  activeDecade: number;
  setActiveDecade: Function;
  setAssetsHandler: Function;
}) {
  const fltrs = filters.map((filter) => (
    <li
      key={filter}
      className={
        filter === activeDecade
          ? "p-2 rounded-lg text-center border border-gray-300 text-white bg-amber-500 cursor-pointer"
          : "p-2 rounded-lg text-center border border-gray-300 cursor-pointer  hover:bg-amber-500 hover:text-white hover:drop-shadow-2xl transition-all duration-200"
      }
      onClick={() => {
        setActiveDecade(filter);
        setAssetsHandler(filter);
      }}
    >
      {filter}
    </li>
  ));
  return (
    <main>
      <div className="flex justify-center mt-4 mb-2">
        <b>Year</b>
      </div>
      <ul className="flex justify-center gap-4 text-black">{fltrs}</ul>
    </main>
  );
}
