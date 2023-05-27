import { Args, Command, Flags } from "@oclif/core"
import fetch from 'node-fetch';
import * as dotenv from 'dotenv' 

export default class Report extends Command
{
    static flags = {
        message: Flags.string({char: 'm', description: 'Message that need to be submitted', required: true}),
        status: Flags.string({char: 's', description: 'Status of the transformation', required: true}),
        id: Flags.string({char: 'i', description: 'Id of the transformation', required: true}),
      }
    
     
    async run(): Promise<any> {
        const flags = await this.parse(Report);
        dotenv.config();
        const url= `${process.env.GET_SBX_URL}/transformations/${flags.flags.id}/messages`;
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify({ message: flags.flags.message, status: flags.flags.status}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GET_SBX_AUTH_TOKEN as string}`
            }
        });
        const data = await response.json();
        console.log(`Succesfully submitted the status of the transformation with id ${flags.flags.id} ${JSON.stringify(data)}`);
        
    }

}