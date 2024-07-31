import { useEffect, useState } from "react";

// this hook take two parameters key, or initial value
export function UseLocalStorage(key, initialData) {
  const [data, setData] = useState(initialData);

  // check if data present inside key localstorage
  // if data is present set state with existing data
  // else store initial data in local storage

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem(key));

    if (existingData) {
      setData(existingData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, []);

  // this function set the data from the user in local storage

  const updateLocalStorage = (newData) => {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
    }
    setData(newData);
  };

  return [data, updateLocalStorage];
}
