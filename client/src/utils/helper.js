export const sort = (arr) => {
    const sorted = arr.sort((a,b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
  
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      })
    
    return sorted
}