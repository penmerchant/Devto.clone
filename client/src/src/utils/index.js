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


export const checkFollow = (arr, userId) => {
  return arr && arr.indexOf(userId) !== -1;
};

export const countArrayLength = (arr) => {
  return arr && arr.length;
};

export const countCommentsLength = (comments) => {
  let totalLength = comments.length;

  for (const[key] of comments.entries()) {
    if (comments[key].replies.length > 0) {
      totalLength += comments[key].replies.length;
    }
  }

  return totalLength;
}

export const shortenString = (str) => {
  return str.length >= 35? str.substring(0, 15) : str;
};

export const sortByDate = (posts, type) => {
  let sortedPost = [];

  if (type === 'Latest'){
   
  }else{

  }

  return sortedPost;
};