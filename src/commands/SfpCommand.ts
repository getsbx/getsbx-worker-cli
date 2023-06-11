import Command from '@oclif/command';
import { OutputArgs, OutputFlags } from '@oclif/parser';
import SFPlogger, { COLOR_HEADER } from '@dxatscale/sfp-logger/lib/SFPLogger';
import path = require('path');
import * as fs from 'fs-extra';
const pjson = require('../../package.json');
import * as dotenv from 'dotenv'

export default abstract class SfpCommand extends Command {
    // The parsed flags for easy reference by this command; assigned in init
    protected flags: OutputFlags<any>;

    // The parsed args for easy reference by this command; assigned in init
    protected args: OutputArgs;

    protected varargs?: any;
    protected projectName: string;


    // TypeScript does not yet have assertion-free polymorphic access to a class's static side from the instance side
    protected get statics() {
        return this.constructor as typeof SfpCommand;
    }

    public async run<T>(): Promise<T> {
        await this.init();
        dotenv.config();

        if (this.args.caller !== 'inner') {
            SFPlogger.log(
                COLOR_HEADER(
                    `sbxw cli -Version:${this.config.version} -Release:${pjson.release}`
                )
            );
        }


        
        if(!process.env.GET_SBX_URL)
         throw new Error(`GET_SBX_URL is not set in the environment variables`);

        if(!process.env.GET_SBX_TOKEN)
            throw new Error(`GET_SBX_TOKEN is not set in the environment variables`);

    
        if(!process.env.SALESFORCE_CONSUMER_KEY)
            throw new Error(`SALESFORCE_CONSUMER_KEY is not set in the environment variables`);
        
        if(!process.env.SALESFORCE_CONSUMER_SECRET)
            throw new Error(`SALESFORCE_CONSUMER_SECRET is not set in the environment variables`);


        this.projectName = `${path.basename(process.cwd())}`;

        let jsonObj;
        let pathToSfpProjectConfig = path.join(this.config.configDir, `${this.projectName}.json`);
        if (fs.existsSync(pathToSfpProjectConfig)) {
            jsonObj = fs.readJsonSync(pathToSfpProjectConfig);
        } else {
            jsonObj = {};
        }



        return this.exec();
    }

    protected async init(): Promise<void> {
        const { args, flags } = this.parse({
            flags: this.statics.flags,
            args: this.statics.args,
        });

        this.flags = flags;
        this.args = args;
    }

    /**
     * Actual command run code goes here
     */
    protected abstract exec(): Promise<any>;


    protected async postData(api:string,body:any)
    {

        const url= `${process.env.GET_SBX_URL}/${api}`;
        SFPlogger.log(`POST ${url}: ${JSON.stringify(body)}`);
      
        try{
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GET_SBX_TOKEN as string}`
            }
        });
        const data = await response.json();
         return data;
      }catch(error)
      {
        SFPlogger.log(`Error: ${JSON.stringify(error)}`);
        throw error;
      }
    }

    protected async patchData(api:string,body:any)
    {
        const url= `${process.env.GET_SBX_URL}/${api}`;
        const response = await fetch(url, {
            method: 'patch',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GET_SBX_TOKEN as string}`
            }
        });
        const data = await response.json();
        return data;
    }

    protected async getData(api:string)
    {
        const url= `${process.env.GET_SBX_URL}/${api}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.GET_SBX_TOKEN}`
            }
          });
        const data = await response.json();
        return data;
    }
}