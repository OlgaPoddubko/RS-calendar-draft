export default function makeDB (resp) {
  let dataBase = {};
  resp.forEach(item => {
    let itemsDate = new Date(item.start);
    let key = new Date(itemsDate.getUTCFullYear(), itemsDate.getUTCMonth(), itemsDate.getUTCDate()).valueOf();
    if(key in dataBase) {
      let newValue = dataBase[key].push(item);
    }
    else{
      dataBase[key] = [item];
    }
  });
  return dataBase;
}
