import { FileLogger } from '@dxatscale/sfp-logger';
import SFPOrg from '@dxatscale/sfpowerscripts.core/lib/org/SFPOrg';
import InstallUnlockedPackageCollection from '@dxatscale/sfpowerscripts.core/lib/package/packageInstallers/InstallUnlockedPackageCollection';
import Package2Detail from '@dxatscale/sfpowerscripts.core/lib/package/Package2Detail';
import { Sandbox } from '../sandbox/sandbox';

export async function installPackageCollection(
  sandbox: Sandbox,
  package2Details: Package2Detail[],
) {
  const sfpOrg = await SFPOrg.create({ connection: sandbox.connection });
  const fileLoggger = new FileLogger(
    `./log/${sfpOrg.getUsername()}-installPackageCollection.log`,
  );
  const installer = new InstallUnlockedPackageCollection(sfpOrg, fileLoggger);
  await installer.install(package2Details, true, true);
}
