import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export function TableOfContents() {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const headingElements = document.querySelectorAll('.post-wrapper h2');
    const callback = ([entry]) => {
      const activeHeading = entry.target;
      const links = Array.from(
        document.querySelectorAll(`.table-of-contents a`),
      );

      links.forEach(link => {
        const [, href] = link.href.split('#');

        if (entry.isIntersecting && href === activeHeading.id) {
          links.forEach(l => l.classList.remove('toc-active'));
          link.classList.add('toc-active');
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: [1.0] });

    const headings = Array.from(headingElements)
      .filter(h2 => h2.id !== 'table-of-contents')
      .map(h2 => {
        observer.observe(h2);

        return {
          label: h2.innerText,
          href: `#${h2.id}`,
        };
      });

    setHeadings(headings);

    return () => {
      Array.from(headingElements).map(h2 => {
        observer.unobserve(h2);
      });
    };
  }, []);

  return (
    <aside class="table-of-contents">
      <div class="toc-sticky-container">
        <h2 id="table-of-contents">Table of Contents</h2>
        <ol>
          {headings.map(heading => (
            <li key={`heading-${heading.href}`}>
              <a href={heading.href}>{heading.label}</a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
