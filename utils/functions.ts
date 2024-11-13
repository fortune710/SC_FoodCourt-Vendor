import { decode } from "base64-arraybuffer";

export function groupArrayBy(array: any[], key: string) {
  return array?.reduce((result, currentItem) => {
    // Get the value of the key we're grouping by
    const groupKey = currentItem[key];
    
    // If an array doesn't exist for this key, create it
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    // Push the entire item to the array for this key
    result[groupKey].push(currentItem);
    
    return result;
  }, {});
}

export function canShowAdminMenu(userType: string, vendorView: boolean) {
  if (userType === "admin" && !vendorView) return true;

  return false;
}


export function decodeBase64(base64: string) {
  const base64Str = base64.includes("base64,")
  ? base64.substring(
      base64.indexOf("base64,") + "base64,".length
    )
  : base64;
  const res = decode(base64Str);

  if (!(res.byteLength > 0)) {
    console.error("[uploadToSupabase] ArrayBuffer is null");
    return null;
  }
  return res
}