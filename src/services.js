export function getLocalData(name) {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch {
    console.log('error');
  }
}

export function setLocalData(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}
