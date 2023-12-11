'use client'

import { createContext, useContext, useState } from 'react';
import { Provider } from 'react-redux'
import { store } from '@/app/redux/store'


export function Providers({children}: {children: React.ReactNode}) {

  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
}
