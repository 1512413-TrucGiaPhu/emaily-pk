const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => !regex.test(email));
  // map() take a value out of an array, do something in the arrow function, and return them in an new array

  if(invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return; //return null;
}