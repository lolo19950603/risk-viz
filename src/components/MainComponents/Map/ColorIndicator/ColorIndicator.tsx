export default function ColorIndicator() {
  return (
    <ul className="flex justify-start gap-4 pb-1 text-black">
      <li className="flex">
        <span className="pt-1">
          <b>Average Risk Rating :</b>
        </span>
      </li>
      <li className="flex">
        <img src="images/green.png" height="32" width="32" />
        <span className="pt-1">0.40-0.45</span>
      </li>
      <li className="flex">
        <img src="images/yellow.png" height="32" width="32" />
        <span className="pt-1">0.45-0.50</span>
      </li>
      <li className="flex">
        <img src="images/orange.png" height="32" width="32" />
        <span className="pt-1">0.50-0.55</span>
      </li>
      <li className="flex">
        <img src="images/red.png" height="32" width="32" />
        <span className="pt-1">0.55-0.60</span>
      </li>
    </ul>
  );
}
