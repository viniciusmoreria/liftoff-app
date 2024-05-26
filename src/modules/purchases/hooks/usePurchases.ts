import { Context, useContext } from 'react';

import { PurchasesContext, PurchasesContextProps } from '../context/purchases-context';

export const usePurchases = () => useContext(PurchasesContext as Context<PurchasesContextProps>);
