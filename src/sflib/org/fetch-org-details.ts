
import { Org } from "@salesforce/core";
import { loginwithSfdxAuthUrl } from "../auth/auth-org";
import  SFOrg from "../org/org";

export async function fetchOrgDetails(
	consumerKey: string,
	consumerSecret: string,
	refreshToken: string,
	loginUrl: string,
):Promise<SFOrg> {
	const connection = await loginwithSfdxAuthUrl(
		consumerKey,
		consumerSecret,
		refreshToken,
		loginUrl,
	);

	const org = await Org.create({ connection: connection });

    return { orgId:org.getOrgId(), instanceUrl:org.getConnection().instanceUrl, refreshToken:refreshToken, username:org.getUsername() }

}
