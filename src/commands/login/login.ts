import { Args, Command, Flags } from "@oclif/core"
import fetch from 'node-fetch';
import * as dotenv from 'dotenv' 

export default class Login extends Command
{
    static flags = {
        alias: Flags.string({char: 'a', description: 'Alias of the authenticated org', required: true}),
        id: Flags.string({char: 'i', description: 'Id of the org', required: true}),
      }
    
     
    async run(): Promise<any> {
      
    }

}