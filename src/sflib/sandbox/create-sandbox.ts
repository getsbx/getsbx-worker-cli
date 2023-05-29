import SFPOrg from '@dxatscale/sfpowerscripts.core/lib/org/SFPOrg';

import { Sandbox } from './sandbox';

export type SandboxRequest = {
  name?: string;
  cloneFrom?: string;
  licenseType?: 'Developer' | 'Developer_Pro' | 'Partial' | 'Full';
  expireIn?: number;
};

const generateSboxName = async (name: string): Promise<string> => {
  const generated = `${name}${Date.now().toString(36).slice(-7)}`;
  return generated;
};

export async function createSandbox(
  hubOrg: SFPOrg,
  sandboxRequest: SandboxRequest,
): Promise<Sandbox> {
  if (!sandboxRequest.cloneFrom) {
    const sandboxProcessObject = await hubOrg.createSandbox(
      {
        SandboxName: await generateSboxName(sandboxRequest.name),
        LicenseType: sandboxRequest.licenseType,
        Description: 'Created by codev sandbox pooler',
      },
      { async: true },
    );
    const createdSandbox: Sandbox = {
      sandboxInfoId: sandboxProcessObject.SandboxInfoId,
      name: sandboxProcessObject.SandboxName,
      licenseType: sandboxRequest.licenseType,
      devhubId: hubOrg.getOrgId(),
    };
    return createdSandbox;
  } else {
    const sandboxProcessObject = await hubOrg.cloneSandbox(
      {
        SandboxName: await generateSboxName(sandboxRequest.name),
        LicenseType: sandboxRequest.licenseType,
        Description: 'Created by codev sandbox pooler',
      },
      sandboxRequest.cloneFrom,
      {},
    );
    const clonedSandbox: Sandbox = {
      sandboxInfoId: sandboxProcessObject.SandboxInfoId,
      name: sandboxProcessObject.SandboxName,
      cloneFrom: sandboxRequest.cloneFrom,
      licenseType: sandboxRequest.licenseType,
      devhubId: hubOrg.getOrgId(),
    };
    return clonedSandbox;
  }
}
