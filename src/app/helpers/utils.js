class Utils {
  static getLocalStorageItem = (key) => {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item);
  };

  static setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static removeLocalStorageItem = (key) => {
    localStorage.removeItem(key);
  };

  // format date to yyyy-mm-dd hh:mm AM/PM
  static formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`;
    const day = `${d.getDate()}`;
    const year = d.getFullYear();
    const hour = d.getHours();
    const min = d.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12;
    const hour12 = h || 12;
    const time = `${hour12}:${min} ${ampm}`;
    return `${year}-${month.length === 1 ? `0${month}` : month}-${
      day.length === 1 ? `0${day}` : day
    } ${time}`;
  };

  // format date to yyyy-mm-dd
  static formatDateYYMMDD = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`;
    const day = `${d.getDate()}`;
    const year = d.getFullYear();
    return `${year}-${month.length === 1 ? `0${month}` : month}-${
      day.length === 1 ? `0${day}` : day
    }`;
  };
}

export default Utils;
