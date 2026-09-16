// Translation dictionary for the HJZ Accessories storefront.
// Keep keys identical across languages so useLanguage().t() can look up
// either one with the same dotted path, e.g. t('hero.title').

export const translations = {
  fr: {
    meta: {
      title: 'HJZ Accessories — Bijoux et accessoires',
    },
    nav: {
      brandSub: 'Accessories',
      shop: 'Boutique',
    },
    hero: {
      title: 'Des bijoux qui traversent le temps',
      subtitle:
        'Chaînes, pendentifs et bracelets choisis pièce par pièce, livrés à votre porte dans les 69 wilayas.',
      cta: 'Découvrir la collection',
    },
    trust: {
      delivery: 'Livraison dans les 69 wilayas',
      cod: 'Paiement à la livraison',
      curated: 'Pièces sélectionnées avec soin',
    },
    collection: {
      heading: 'La collection',
      subheading: 'Des pièces disponibles en quantité limitée.',
      loading: 'Chargement des produits...',
      empty: 'Aucun produit disponible pour le moment.',
    },
    product: {
      currency: 'DA',
      soldOut: 'Épuisé',
    },
    footer: {
      tagline: 'Bijoux et accessoires, livrés partout en Algérie.',
      rights: 'Tous droits réservés.',
    },
    productDetail: {
      back: 'Retour à la boutique',
      loading: 'Chargement...',
      notFound: "Ce produit n'existe pas ou n'est plus disponible.",
      backToShop: 'Retour à la boutique',
      formTitle: 'Passer commande',
      firstName: 'Prénom',
      lastName: 'Nom',
      phone: 'Numéro de téléphone',
      phonePlaceholder: '05XX XX XX XX',
      wilaya: 'Wilaya',
      wilayaPlaceholder: 'Sélectionnez votre wilaya',
      size: 'Taille',
      sizePlaceholder: 'Choisissez une taille',
      submit: 'Confirmer la commande',
      submitting: 'Envoi...',
      errorRequired: 'Merci de remplir tous les champs obligatoires.',
      errorSize: 'Merci de choisir une taille.',
      errorSubmit: "La commande n'a pas pu être envoyée. Réessayez.",
      successTitle: 'Commande envoyée',
      successMessage:
        'Merci {name}, notre équipe vous contactera au {phone} pour confirmer la livraison.',
      soldOutTitle: 'Produit épuisé',
      soldOutMessage: "Cette pièce n'est plus disponible pour le moment.",
    },
    support: {
      title: 'Assistance HJZ',
      subtitle: 'Une question sur une commande ou un produit ? Écrivez-nous.',
      online: 'En ligne',
      empty: "Aucun message pour l'instant. Dites-nous bonjour !",
      placeholder: 'Votre message...',
      send: 'Envoyer',
      open: 'Ouvrir le support',
      close: 'Fermer le support',
    },
  },

  ar: {
    meta: {
      title: 'HJZ Accessories — مجوهرات وإكسسوارات',
    },
    nav: {
      brandSub: 'Accessories',
      shop: 'المتجر',
    },
    hero: {
      title: 'مجوهرات تروي حكاية تدوم',
      subtitle:
        'سلاسل وقلادات وأساور مُنتقاة قطعة بقطعة، تصل إلى باب منزلك في الولايات الـ69.',
      cta: 'اكتشفي المجموعة',
    },
    trust: {
      delivery: 'التوصيل إلى الولايات الـ69',
      cod: 'الدفع عند الاستلام',
      curated: 'قطع مُنتقاة بعناية فائقة',
    },
    collection: {
      heading: 'المجموعة',
      subheading: 'كل قطعة متوفرة بكمية محدودة.',
      loading: 'جارٍ تحميل المنتجات...',
      empty: 'لا توجد منتجات متاحة حاليًا.',
    },
    product: {
      currency: 'دج',
      soldOut: 'نفدت الكمية',
    },
    footer: {
      tagline: 'مجوهرات وإكسسوارات، توصيل إلى جميع أنحاء الجزائر.',
      rights: 'جميع الحقوق محفوظة.',
    },
    productDetail: {
      back: 'العودة إلى المتجر',
      loading: 'جارٍ التحميل...',
      notFound: 'هذا المنتج غير موجود أو لم يعد متوفرًا.',
      backToShop: 'العودة إلى المتجر',
      formTitle: 'إتمام الطلب',
      firstName: 'الاسم',
      lastName: 'اللقب',
      phone: 'رقم الهاتف',
      phonePlaceholder: '05XX XX XX XX',
      wilaya: 'الولاية',
      wilayaPlaceholder: 'اختر ولايتك',
      size: 'المقاس',
      sizePlaceholder: 'اختر المقاس',
      submit: 'تأكيد الطلب',
      submitting: 'جارٍ الإرسال...',
      errorRequired: 'يرجى ملء جميع الحقول المطلوبة.',
      errorSize: 'يرجى اختيار مقاس.',
      errorSubmit: 'تعذّر إرسال الطلب. حاول مرة أخرى.',
      successTitle: 'تم إرسال الطلب',
      successMessage:
        'شكرًا {name}، سيتصل بك فريقنا على الرقم {phone} لتأكيد التوصيل.',
      soldOutTitle: 'المنتج غير متوفر',
      soldOutMessage: 'هذه القطعة لم تعد متوفرة حاليًا.',
    },
    support: {
      title: 'دعم HJZ',
      subtitle: 'لديك سؤال حول طلب أو منتج؟ راسلينا.',
      online: 'متصل الآن',
      empty: 'لا توجد رسائل بعد. قولي مرحبًا!',
      placeholder: 'رسالتك...',
      send: 'إرسال',
      open: 'فتح الدعم',
      close: 'إغلاق الدعم',
    },
  },
}
