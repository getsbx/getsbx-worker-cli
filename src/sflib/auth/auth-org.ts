import {
	AuthFields,
	AuthInfo,
	Connection,
	SandboxProcessObject,
	SandboxUserAuthResponse,
} from "@salesforce/core";
import axios from "axios";

export interface SalesforceTokenResponse {
	access_token: string;
	refresh_token: string;
	instance_url: string;
	id: string;
	token_type: string;
	issued_at: string;
	signature: string;
}

export interface SandboxLoginParams {
	loginUrl: string;
	instanceUrl: string;
	authUserName: string;
	authCode: string;
	devhubUserName: string;
	callbackUrl: string;
}

export interface SandboxLoginResponse {
	loginUrl: string|undefined;
	instanceUrl: string|undefined;
	username: string|undefined;
	refreshToken: string|undefined;
	clientId: string|undefined;
	clientSecret: string|undefined;
}

// Logs into a salesforce org using access code, instance url and username
export async function loginwithSfdxAuthUrl(
	clientId: string,
	clientSecret: string,
	refreshToken: string,
	instanceUrl: string,
): Promise<Connection> {
	//force://<clientId>:<clientSecret>:<refreshToken>@<instanceUrl>
	const sfdxAuthUrl = `force://${clientId}:${clientSecret}:${refreshToken}@${instanceUrl}`;
	const oauth2Options = AuthInfo.parseSfdxAuthUrl(sfdxAuthUrl);
	const authInfo = await AuthInfo.create({ oauth2Options });
	return await Connection.create({ authInfo });
}

export async function generateRefreshToken(
	clientId: string,
	clientSecret: string,
	accessToken: string,
	redirectUri: string,
): Promise<string> {
	try {
		const tokenEndpoint = "https://login.salesforce.com/services/oauth2/token";

		const response = await axios.post<SalesforceTokenResponse>(
			tokenEndpoint,
			null,
			{
				params: {
					grant_type: "refresh_token",
					client_id: clientId,
					client_secret: clientSecret,
					access_token: accessToken,
					redirect_uri: redirectUri,
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		return response.data.refresh_token;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function refreshAccessToken(
	clientId: string,
	clientSecret: string,
	refreshToken: string,
	redirectUri: string,
): Promise<string | null> {
	try {
		const tokenEndpoint = "https://login.salesforce.com/services/oauth2/token";

		const response = await axios.post<SalesforceTokenResponse>(
			tokenEndpoint,
			null,
			{
				params: {
					grant_type: "refresh_token",
					client_id: clientId,
					client_secret: clientSecret,
					refresh_token: refreshToken,
					redirect_uri: redirectUri,
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		return response.data.access_token;
	} catch (error) {
		throw error;
	}
}

export async function introspectAccessToken(
	baseUrl: string,
	clientId: string,
	clientSecret: string,
	accessToken: string,
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<any> {
	const introspectUrl = `${baseUrl}/services/oauth2/introspect`;
	const authString = `Basic ${Buffer.from(
		`${clientId}:${clientSecret}`,
	).toString("base64")}`;

	const requestBody = new URLSearchParams();
	requestBody.append("token", accessToken);
	requestBody.append("token_type_hint", "access_token");

	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: authString,
		},
	};

	try {
		const response = await axios.post(introspectUrl, requestBody, config);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function retrieveSandboxAuthFields(
	sandboxLoginParams: SandboxLoginParams,
): Promise<SandboxLoginResponse> {
	if (sandboxLoginParams.authUserName) {
		const oauth2Options: AuthFields & {
			redirectUri?: string;
		} = {
			loginUrl: sandboxLoginParams.loginUrl,
			instanceUrl: sandboxLoginParams.instanceUrl,
			username: sandboxLoginParams.authUserName,
		};

		oauth2Options.redirectUri = sandboxLoginParams.callbackUrl;
		oauth2Options.authCode = sandboxLoginParams.authCode;

		const authInfo = await AuthInfo.create({
			username: sandboxLoginParams.authUserName,
			oauth2Options,
			parentUsername: sandboxLoginParams.devhubUserName,
		});

		const authInfoFields = authInfo.getFields(true);

		console.log(authInfoFields);

		return {
			loginUrl: authInfoFields.loginUrl,
			instanceUrl: authInfoFields.instanceUrl,
			username: authInfoFields.username,
			refreshToken: authInfoFields.refreshToken,
			clientId: authInfoFields.clientId,
			clientSecret: authInfoFields.clientSecret,
		};
	} else {
		throw new Error("No authUserName found in sandbox response");
	}
}
