export function shallowEquals<T extends Record<string, string>>(
  object1: T,
  object2: T,
) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (object1[key] !== object2[key]) return false;
  }

  return true;
}
