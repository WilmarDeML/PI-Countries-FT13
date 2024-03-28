//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import server from './src/app.js';
import conn from './src/db.js';
import { SERVER_PORT } from './src/config.js';
// Syncing all the models at once.
conn.sync(/*{ force: true }*/).then(() => { // force: true obliga a borrar las tablas si existen y crearlas de nuevo
  const servidor = server.listen(SERVER_PORT ?? 3001, () => {
    console.log(`Escuchando en el puerto: ${servidor.address().port}`); // eslint-disable-line no-console
  });
});
