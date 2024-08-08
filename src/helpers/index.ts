export function formatCurrency(price: string | number): string {
  const formattedCurrency = Number(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formattedCurrency
}
