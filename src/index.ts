// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEquals(a: any, b: any): boolean {
  const typeA = Object.prototype.toString.call(a);
  const typeB = Object.prototype.toString.call(b);
  if (typeA != typeB) {
    return false;
  }
  if (typeA == "[object Number]" && typeB == "[object Number]" && isNaN(a) && isNaN(b)) {
    return true; 
  }
  if (isBasicType(typeA) && isBasicType(typeB)) return a == b;
  if ((typeA == "[object Object]" && typeB == "[object Object]") || (typeA == "[object Array]" || typeA == "[object Array]")){
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if(keysA.length != keysB .length) return false;
    for( let key of keysA) {
      if(!keysB.includes(key)) return false;
      if(!isEquals(a[key],b[key])) return false;
    }
    return true;
  }
  return false;
}

const isBasicType = (type: string) => {
  if (
    type == "[object Number]" ||
    type == "[object String]" ||
    type == "[object Boolean]" ||
    type == "[object Undefined]" ||
    type == "[object Null]" ||
    type == "[object Symbol]"
  )
    return true;
  return false;
};
