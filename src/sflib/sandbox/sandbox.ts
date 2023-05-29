import Package2Detail from '@dxatscale/sfpowerscripts.core/lib/package/Package2Detail';
import { Connection } from '@salesforce/core/lib/org/connection';

export interface Sandbox {
  copyProgress?: number;
  sandboxInfoId?: string|undefined;
  devhubId?:string;
  name?: string;
  cloneFrom?: string;
  licenseType?: string;
  instanceUrl?: string;
  loginUrl?: string;
  accessToken?: string;
  sandboxProcessId?:string;
  sandboxSalesforceId?: string;
  failureMessage?: string;
  password?: string;
  expiryDate?: string;
  sfdxAuthUrl?: string;
  assignedTo?: string;
  status?: string;
  sandboxId?:number,
  connection?: Connection;
}

export interface SandboxConfig {
  packagesToBeInstalled?: Package2Detail[];
  usersToBeActivated?: string[];
}
