/**
 * Create Restore and Store setting functions
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
export function restoreSettings() {
  let settings = null;

  try {
    const storedData = localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    }
  } catch (err) {
    // If stored data is not a strigified JSON this might fail,
    // that's why we catch the error
  }

  return settings;
}

export function storeSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}
