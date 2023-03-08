function equipmentFormParser(z) {
    const parsedObj = {};
    for(let item in z) {
        if(item.endsWith('-desc')) {
              const prefix = item.split("-desc")[0];
              const value = z[item];
                if(parsedObj[prefix]) {
                parsedObj[prefix]["desc"] = value;
              } else {
                  parsedObj[prefix] = {tagname: prefix, desc: value }
              }
        } else {
          // add price
          const prefix = item;
      const value = z[item];
      if(parsedObj[prefix]) {
                parsedObj[prefix]["price"] = value;
              } else {
                  parsedObj[prefix] = {tagname: prefix, price: value }
              }
          }
      }
      return Object.values(parsedObj)
}

export {equipmentFormParser}