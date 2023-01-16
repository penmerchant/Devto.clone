export const appendData = (data) => {
    const formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        // value = JSON.stringify(value);
      }
      formData.append(`${key}`, value);
    }
    return formData;
};

export const formatDate = (date) => {
  const parsedDate = new Date(date);
  
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth();
  const day = parsedDate.getDate();

  return [year, month, day].join('/');
};

export const checkInArray = (arr, userId) => {
  return arr && arr.indexOf(userId) !== -1;
};

export const countArrayLength = (arr) => {
  return arr && arr.length;
};