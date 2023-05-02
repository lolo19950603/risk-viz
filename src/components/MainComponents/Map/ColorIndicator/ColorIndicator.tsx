import Image from 'next/image'

export default function ColorIndicator() {
  return (
    <ul className="flex justify-start gap-4 pb-1 text-black">
      <li className="flex">
        <span className="pt-1">
          <b>Average Risk Rating :</b>
        </span>
      </li>
      <li className="flex">
        <Image src="/images/green.png" alt='0.40-0.45' height="32" width="32" />
        <span className="pt-1">0.40-0.45</span>
      </li>
      <li className="flex">
        <Image src="/images/yellow.png" alt='0.45-0.50' height="32" width="32" />
        <span className="pt-1">0.45-0.50</span>
      </li>
      <li className="flex">
        <Image src="/images/orange.png" alt='0.50-0.55' height="32" width="32" />
        <span className="pt-1">0.50-0.55</span>
      </li>
      <li className="flex">
        <Image src="/images/red.png" alt='0.55-0.60' height="32" width="32" />
        <span className="pt-1">0.55-0.60</span>
      </li>
    </ul>
  );
}
