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