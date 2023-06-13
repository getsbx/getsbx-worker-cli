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
        transformationjobid:flags.integer({char: 't', description: 'Run Id of the transformation', required: true})
      }
    

      static summary = 'Report about transformation'
      static description = 'Send message and status'

    async exec(): Promise<any> {

        const url= `transformations/${this.flags.id}/messages`;
        const result = await  super.postData(url, { message: this.flags.message, status: this.flags.status,transformationJobId:this.flags.transformationjobid});
        console.log(`Succesfully submitted the status of the transformation with id ${this.flags.id} ${JSON.stringify(result)}`);
        
    }

}