import Link from 'next/link';

import classes from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/map">Map</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;