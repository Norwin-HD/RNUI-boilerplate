import transaccionesMockup from "./transactionsMockup";

type CategoryMock = {
  imageUri?: string;
  title: string;
  transactions: string;
  active?: boolean;
};

// Build categories derived from transactions mockup: take unique categoria names,
// keep the first imageUri found for that category and count occurrences.
const map = new Map<string, { imageUri: string; count: number }>();

transaccionesMockup.forEach((t) => {
  const title = t.categoria ?? "Otros";
  const imageUri = t.imageUri ?? "ellipsis";
  if (!map.has(title)) {
    map.set(title, { imageUri, count: 1 });
  } else {
    const cur = map.get(title)!;
    cur.count += 1;
  }
});

export const categories: CategoryMock[] = Array.from(map.entries()).map(
  ([title, { imageUri, count }], idx) => ({
    imageUri,
    title,
    transactions: `${count} transacciones hasta ahora`,
    active: idx === 0,
  })
);

export default categories;
