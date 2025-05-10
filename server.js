const http = require('http');
const app = require('./app'); // Import the app module
const server = http.createServer(app);

 server.listen(3000,console.log('Server is running on port 3000'));
// server.listen(300, () => {
//     console.log('Server is running on port 300');
//   });