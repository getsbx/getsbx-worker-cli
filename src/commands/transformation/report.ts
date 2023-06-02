import { Args, Command } from "@oclif/core"
import SfpCommand from "../SfpCommand";
import * as dotenv from 'dotenv' 
import { flags } from "@oclif/parser";

export default class Report extends SfpCommand
{
   
    static flags = {
        message: flags.string({char: 'm', description: 'Message that need to be submitted', required: true}),
        status: flags.string({char: 's', description: 'Status of the transformation', required: true}),
        id: flags.string({char: 'i', description: 'Id of the transformation', required: true}),
      }
    

      static summary = 'Report about transformation'
      static description = 'Send message and status'

    async exec(): Promise<any> {

        const url= `${process.env.GET_SBX_URL}/transformations/${this.flags.id}/messages`;
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify({ message: this.flags.message, status: this.flags.status}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GET_SBX_AUTH_TOKEN as string}`
            }
        });
        const data = await response.json();
        console.log(`Succesfully submitted the status of the transformation with id ${this.flags.id} ${JSON.stringify(data)}`);
        
    }

}