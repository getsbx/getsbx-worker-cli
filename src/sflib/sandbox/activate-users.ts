import { Connection } from '@salesforce/core/lib/org/connection';
import QueryHelper from '@dxatscale/sfpowerscripts.core/lib/queryHelper/QueryHelper';
import axios from 'axios';
import SFPOrg from '@dxatscale/sfpowerscripts.core/lib/org/SFPOrg';
import { Sandbox, SandboxConfig } from './sandbox';
import SFPLogger, { ConsoleLogger } from '@dxatscale/sfp-logger';

export async function activateUsers(
  sandbox: Sandbox,
  sandboxConfig: SandboxConfig,
): Promise<void> {
  for (let username of sandboxConfig?.usersToBeActivated as string[]) {
    const logger = new ConsoleLogger();;

    try {
      username = username.concat(`.${sandbox.name}`);
      const sfpOrg = await SFPOrg.create({ connection: sandbox.connection });

      const query = `SELECT Id,IsActive FROM User WHERE Username = '${username}'`;

      const records = await QueryHelper.query<{
        Id: string;
        IsActive: boolean;
      }>(query, sfpOrg.getConnection(), true);

      // Get user record
      const userRecord = records[0];

      if (!userRecord) {
        SFPLogger.log(`User with username '${username}' not found.`);
        continue;
      }

      const userId = userRecord.Id;
      const isActive = userRecord.IsActive;

      // Check if the user is already active
      if (isActive) {
        SFPLogger.log(`User '${username}' is already active.`);
        continue;
      }

      // Activate user
      const maxApiVersion = await sfpOrg.retrieveMaxApiVersion();
      const headers = {
        Authorization: `Bearer ${sandbox.connection?.accessToken}`,
        'Content-Type': 'application/json',
      };
      const updateUrl = `https://${sandbox.connection?.instanceUrl}/services/data/${maxApiVersion}/tooling/sobjects/User/${userId}`;
      await axios.patch(updateUrl, { IsActive: true }, { headers });

      SFPLogger.log(`User '${username}' has been activated.`);
    } catch (error:any) {
      SFPLogger.log(`Error activating user '${username}':+ ${error.message}`);
    }
  }
}
