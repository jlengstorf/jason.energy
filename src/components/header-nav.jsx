import { useState } from "preact/hooks";
import styles from "../styles/header-nav.module.css";

export function Nav() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    console.log("click");
    setOpen(!open);
  }

  console.log(open);

  return (
    <>
      <button
        class={`${styles.toggleSiteNav} ${open && styles.open}`}
        onClick={handleClick}
      >
        <span class="visually-hidden">open site nav</span>
        <img src="/images/icon-menu.svg" alt="menu" />
      </button>
      <nav class={`${styles.siteNav} ${open && styles.open}`}>
        <a href="/posts">Writing</a>
        <a href="/projects">Projects</a>
        <a href="/newsletter">Newsletter</a>
        <a href="/uses">Things I Use</a>
        <a href="/press">Press Kit</a>
        <a href="/contact">Contact</a>
      </nav>
    </>
  );
}
