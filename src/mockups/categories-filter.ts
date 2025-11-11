import transaccionesMockup from './transactionsMockup'

type CategoryMock = {
  imageUri?: string
  title: string
  transactions: string
  active?: boolean
}

const grouped = transaccionesMockup.reduce<Record<string, { imageUri: string; count: number }>>(
  (acc, t) => {
    const title = t.categoria ?? 'Otros'
    const imageUri = t.imageUri ?? 'ellipsis'
    if (!acc[title]) acc[title] = { imageUri, count: 0 }
    acc[title].count += 1
    return acc
  },
  {}
)

export const categories: CategoryMock[] = Object.entries(grouped).map(
  ([title, { imageUri, count }], idx) => ({
    imageUri,
    title,
    transactions: `${count} transacciones hasta ahora`,
    active: idx === 0,
  })
)

export default categories
