/**
 * Hook to use pages context
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import { useContext } from 'react';
import PagesContext from './PagesContext';

export default function usePages() {
  const context = useContext(PagesContext);

  return context;
}
