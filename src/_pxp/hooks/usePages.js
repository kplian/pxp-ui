import { useContext } from 'react';
import PagesContext from '../context/PagesContext';

export default function usePages() {
  const context = useContext(PagesContext);

  return context;
}
