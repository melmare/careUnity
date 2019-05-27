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

export function getNews() {
  return fetch('http://localhost:3000/news').then(res => res.json());
}

export function postNewsEntry(newEntry) {
  return fetch('/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEntry)
  }).then(res => res.json());
}
