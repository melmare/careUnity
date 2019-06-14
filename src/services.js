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

export function createUserGroup(userGroup) {
  const { name, password, users, news } = userGroup;
  return fetch('/usergroups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      password,
      users,
      news
    })
  }).then(res => res.json());
}

export function patchUserGroup(userGroup, id) {
  const { name, password, users, news } = userGroup;
  return fetch('/usergroups/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      password,
      users,
      news
    })
  }).then(res => res.json());
}
