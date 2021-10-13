/**
 * Hook to use settings context
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import { useContext } from 'react';
import SettingsContext from './SettingsContext';

export default function useSettings() {
  const context = useContext(SettingsContext);

  return context;
}