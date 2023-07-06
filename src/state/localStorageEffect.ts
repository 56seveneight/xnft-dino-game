// import { LocalStorage } from 'react-xnft';
import { AtomEffect, DefaultValue } from 'recoil';

export function localStorageEffect<T>(key: string): AtomEffect<T> {
  return ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // @TODO - xnft docs say to use LocalStorage from react-xnft, but it doesn't work
    // Using native localStorage for now.
    //
    // setSelf(LocalStorage.get(key).then(savedValue =>
    //   savedValue != null
    //     ? JSON.parse(savedValue)
    //     : new DefaultValue() // Abort initialization if no value was stored
    // ));

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  }
};