import { Args, Command, Flags } from "@oclif/core"


import { loginwithSfdxAuthUrl } from "../../sflib/auth/auth-org";
import SFPLogger, { LoggerLevel } from "@dxatscale/sfp-logger";
import SfpCommand from "../SfpCommand";
import { flags } from "@oclif/parser";




export default class Login extends SfpCommand {



  static flags = {
    alias: flags.string({ char: 'a', description: 'Alias of the authenticated org', required: true }),
    id: flags.string({ char: 'i', description: 'Id of the org', required: true }),
    sourceorgid: flags.string({ char: 's', description: 'Id of the source org', required: false })
  };


  static summary = 'Login to a source org or org'
  static description = 'Login to the org with the given id and alias'


  async exec(): Promise<any> {


   
    let url;
    if (!this.flags.sourceorgid)
      url = `${process.env.GET_SBX_URL}/organizations/${this.flags.id}`;
    else
      url = `${process.env.GET_SBX_URL}/organizations/${this.flags.id}/sourceOrg/${this.flags.sourceorgid}`;
    
    

    SFPLogger.log(`Fetching org details from ${url}`, LoggerLevel.INFO);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GET_SBX_TOKEN}`
      }
    });
    const organisation: any = await response.json();
    SFPLogger.log(`organisation: ${JSON.stringify(organisation)}`,LoggerLevel.INFO);


    const org = await loginwithSfdxAuthUrl(
      process.env.SALESFORCE_CONSUMER_KEY,
      process.env.SALESFORCE_CONSUMER_SECRET,
      organisation.refreshToken,
      organisation.instanceUrl.includes('sandbox') ? 'test.salesforce.com' : 'login.salesforce.com',
      this.flags.alias
    );
//
    SFPLogger.log(`Sucessfully authenticated to org ${org.getUsername()}`, LoggerLevel.INFO);
  }

}