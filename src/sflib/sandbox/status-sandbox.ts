import SFPOrg from '@dxatscale/sfpowerscripts.core/lib/org/SFPOrg';
import { Sandbox } from './sandbox';

export async function getSandboxStatus(
  hubOrg: SFPOrg,
  sandbox: Sandbox,
): Promise<Sandbox> {
  //Create org
  const sandboxProcess = await hubOrg.querySandboxProcessBySandboxInfoId(
    sandbox?.sandboxInfoId,
  );
  console.log(sandboxProcess);
  const updatedSandBox: Sandbox = { ...sandbox };
  updatedSandBox.status = sandboxProcess.Status;
  updatedSandBox.name  = sandboxProcess.SandboxName;
  updatedSandBox.copyProgress = sandboxProcess.CopyProgress;
  updatedSandBox.sandboxProcessId = sandboxProcess.Id;
  if(sandboxProcess.SandboxOrganization)
    updatedSandBox.sandboxSalesforceId = sandboxProcess.SandboxOrganization;
  return updatedSandBox;
}
