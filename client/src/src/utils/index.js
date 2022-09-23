export const appendData = (data) => {
    const formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value = JSON.stringify(value);
      }
      formData.append(`${key}`, value);
    }
    return formData;
};