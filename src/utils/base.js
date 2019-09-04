const colorPrimary = '#689F38';
const colorSecond = '#8BC34A';
const colorAccess = '#FFEB3B';

const convertInttoHours = string => {
  const data = new Date(string);
  const ampm = data.getHours() > 12 ? 'PM' : 'AM';
  const hours = data.getHours() % 12;
  return `${hours} ${ampm}`;
};

const convertInttoDate = string => {
  const data = new Date(string);
  const day = data.getDate();
  const month = data.getMonth() + 1;
  const years = data.getFullYear();
  return `${day}/${month}/${years}`;
};

export {convertInttoHours, convertInttoDate};
