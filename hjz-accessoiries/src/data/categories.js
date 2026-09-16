// Product categories shared between the admin "add product" form and the
// storefront filter bar. Keep `id` stable — it's what's stored on the
// product row (products.category) — labels can be edited freely.

export const CATEGORIES = [
  { id: 'necklaces', label: { fr: 'Colliers', ar: 'قلادات' } },
  { id: 'bracelets', label: { fr: 'Bracelets', ar: 'أساور' } },
  { id: 'earrings', label: { fr: "Boucles d'oreilles", ar: 'أقراط' } },
  { id: 'rings', label: { fr: 'Bagues', ar: 'خواتم' } },
  { id: 'watches', label: { fr: 'Montres', ar: 'ساعات' } },
  { id: 'other', label: { fr: 'Autres', ar: 'أخرى' } },
]

export function categoryLabel(id, lang) {
  const found = CATEGORIES.find((c) => c.id === id) || CATEGORIES.find((c) => c.id === 'other')
  return found.label[lang] || found.label.fr
}
