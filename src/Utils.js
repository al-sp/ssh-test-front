class Utils {
  static updateItem = (data, item, id) => {
    const result = data.map((el) => {
      if (el.id === id) {
        const newEl = {
          ...item,
          id: `${item.host}-${item.port}-${item.privateKey}`,
        };
        return newEl;
      }
      return el;
    });

    return result;
  }
}

export default Utils;
