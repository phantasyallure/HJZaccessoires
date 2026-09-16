export function formatPrice(price, lang) {
  const amount = Number(price).toLocaleString('fr-FR')
  return lang === 'ar' ? `${amount} دج` : `${amount} DA`
}
