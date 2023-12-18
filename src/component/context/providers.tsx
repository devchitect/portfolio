'use client'

import { createContext, useState } from 'react';
import { Provider } from 'react-redux'
import { store } from '@/app/redux/store'

export const LanguageContext = createContext<string>('');

export function Providers({children, lang}: {children: React.ReactNode, lang : string}) {

  return (
    <Provider store={store}>
      <LanguageContext.Provider value={lang}>
      {children}
      </LanguageContext.Provider>
    </Provider>
  );
}
