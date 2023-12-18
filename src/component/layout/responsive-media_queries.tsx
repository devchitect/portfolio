//
export const desktop = ( typeof window !== 'undefined' && window.matchMedia("(min-width: 1280px)").matches)

export const minLarge = ( typeof window !== 'undefined' && window.matchMedia("(min-width: 1000px)").matches);

export const minMedium = ( typeof window !== 'undefined' && window.matchMedia("(min-width: 640px)").matches)

export const minSmall = ( typeof window !== 'undefined' && window.matchMedia("(min-width: 280px)").matches)

//
export const maxLarge = ( typeof window !== 'undefined' && window.matchMedia("(max-width: 1280px)").matches);

export const maxMedium = ( typeof window !== 'undefined' && window.matchMedia("(max-width: 1000px)").matches)

export const maxSmall = ( typeof window !== 'undefined' && window.matchMedia("(max-width: 640px)").matches)



