import * as fs from 'fs';
import * as path from 'path';


function config_https_cert() {
    const dir = process.cwd();
    const httpsOptions = {
        key: fs.readFileSync(path.resolve(dir, './https/youbaobao.xyz.key')),//
        cert: fs.readFileSync(path.resolve(dir, './https/youbaobao.xyz.pem')),//
    };
    return httpsOptions
}


export default config_https_cert