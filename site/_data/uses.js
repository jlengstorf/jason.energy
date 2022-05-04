module.exports = async function () {
  try {
    const { default: fetch } = await import('node-fetch');

    const items = await fetch(
      // `${process.env.URL || 'http://localhost:8888'}/api/uses`,
      `https://11ty--jasonaf.netlify.app/api/uses`,
    ).then((res) => res.json());

    const categories = new Set();
    items.forEach((item) => {
      categories.add(item.category);
    });

    const categorizedItems = {};

    Array.from(categories.values()).forEach((category) => {
      categorizedItems[category] = items.filter(
        (item) => item.category === category,
      );
    });

    return { items: categorizedItems, categories };
  } catch (e) {
    console.log(e);
    return { items: [], categories: new Set() };
  }
};
