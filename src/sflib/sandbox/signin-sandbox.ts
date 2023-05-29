import { Connection, SandboxUserAuthRequest, SandboxUserAuthResponse } from "@salesforce/core";
import { HttpMethods, HttpRequest } from "jsforce";

export async function signIntoSandbox(
   sandboxName:string,
   devhubConnection: Connection,
   callbackUrl: string
  ): Promise<SandboxUserAuthResponse | undefined> {
   


    try {
      // call server side /sandboxAuth API to auth the sandbox org user with the connected app
      const authFields = devhubConnection.getAuthInfoFields();

      const sandboxReq: SandboxUserAuthRequest = {
        // the sandbox signup has been completed on production, we have production clientId by this point
        clientId: authFields.clientId as string,
        sandboxName: sandboxName,
        callbackUrl,
      };

      const url = `${devhubConnection.tooling._baseUrl()}/sandboxAuth`;
      const params:HttpRequest = {
        method: 'POST',
        url,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sandboxReq),
      };
      const result: SandboxUserAuthResponse = await devhubConnection.tooling.request(params);
      return result;
    } catch (err:any) {
      // There are cases where the endDate is set before the sandbox has actually completed.
      // In that case, the sandboxAuth call will throw a specific exception.
      if (err?.name === 'INVALID_STATUS') {
        console.log('Error while authenticating the user %s', err?.toString());
      } else {
        // If it fails for any unexpected reason, just pass that through
        throw err;
      }
    }
  }
