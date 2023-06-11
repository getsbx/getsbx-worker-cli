import { Args, Command } from "@oclif/core"
import SfpCommand from "../SfpCommand";
import * as dotenv from 'dotenv' 
import { flags } from "@oclif/parser";
import { MetadataResolver } from '@salesforce/source-deploy-retrieve'


export default class Analysis extends SfpCommand
{
   
    static flags = {
        id: flags.string({char: 'i', description: 'Id of the transformation', required: true}),
      }
    

      static summary = 'Post analysis about a transformation'
      static description = 'Analyze the repo and submit available transformations'

    async exec(): Promise<any> {

        let config: any={};
        let namedCredentials:any[]=[];

        const resolver = new MetadataResolver();
        const components = resolver.getComponentsFromPath('force-app');
        for (const component of components) {
            console.log(component.fullName);
            if(component.type.name === 'NamedCredential') {
                console.log(component.type.name);
                namedCredentials.push({fullName: component.fullName});
            }
        }

         config.namedCredentials = namedCredentials;
         const url= `transformations/${this.flags.id}`;
         await super.patchData(url, { id: this.flags.id, transformationConfig: config});
    }
        
    

}