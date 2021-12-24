import { useState } from "preact/hooks";
import { UsedItem } from "../types";
// import { styles } from "../styles/uses-list.module.css";

export function UsesList({ items }) {
  console.log({ items });
  const [filtered, setFilteredItems] = useState(items);

  return (
    <section>
      <p>TODO filtering by category</p>
      <p>TODO filtering by tag</p>

      {items.map((item: UsedItem) => (
        <div class="item">
          <h3>{item.name}</h3>
          <p>test</p>
        </div>
      ))}
    </section>
  );
}
