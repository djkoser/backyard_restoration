require('dotenv').config();
const { sendEmail } = require('../utilities/sendEmail');
const test = async () =>
  console.log(await sendEmail('koser.david@gmail.com', 'myToken'));
test();
