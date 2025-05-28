import * as md5 from "md5";


export default function crypt_encode_md5(str: string) {
    let str_encode: string = md5(str).toUpperCase()
    return str_encode
}