import * as DES from "des.js/lib/des";
import * as Buffer from "buffer";
import {Injectable} from "@angular/core";
@Injectable()
export class DesService {
  private key: string = "mobility";
  constructor(){}

  public encrypt(str : string) : string{
    let key = new Buffer.Buffer(this.key, 'utf8');
    let encryptObj = DES.DES.create({type : 'encrypt' , key : key});
    let input = new Buffer.Buffer(str);
    let result  = new Buffer.Buffer(encryptObj.update(input).concat(encryptObj.final()));
    return result.toString('hex');
  }
  public decrypt(str : string) : string {
    let key = new Buffer.Buffer(this.key, 'utf8');
    let decryptObj = DES.DES.create({type : 'decrypt' , key : key});
    let input = new Buffer.Buffer(str , 'hex');
    let result = new Buffer.Buffer(decryptObj.update(input).concat(decryptObj.final()));
    return result.toString();
  }
}