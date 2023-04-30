export default function ColorIndicator() {
  return (
    <ul className="flex justify-start gap-4 text-black">
      <li className="flex">
        <img src="images/30-40green.png"  height="32" width="32" />
        <span className="pt-1">GOOD</span>
      </li>
      <li className="flex">
        <img src="images/40-50yellow.png"  height="32" width="32" />
        <span className="pt-1">OK</span>
      </li>
      <li className="flex">
        <img src="images/50-60red.png"  height="32" width="32" />
        <span className="pt-1">BAD</span>
      </li>
    </ul>
  );
}
