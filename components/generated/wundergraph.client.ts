// Code generated by wunderctl. DO NOT EDIT.

import type {
	AddMessageResponse,
	AddMessageInput,
	AllUsersResponse,
	AllUsersInput,
	ChangeUserNameResponse,
	ChangeUserNameInput,
	CountriesResponse,
	DeleteAllMessagesByUserEmailResponse,
	DeleteAllMessagesByUserEmailInput,
	GermanyResponse,
	HelloResponse,
	MessagesResponse,
	MockQueryResponse,
	QueryResponse,
	UpdateUserResponse,
	UpdateUserInput,
	UsResponse,
	UserInfoResponse,
} from "./models";
import type { RequestOptions, ClientConfig, UserListener, Response, FetchConfig, Headers } from "@wundergraph/sdk";
import type { User } from "./wundergraph.server";

export const WUNDERGRAPH_S3_ENABLED = false;
export const WUNDERGRAPH_AUTH_ENABLED = true;

export enum AuthProviderId {
	"github" = "github",
	"google" = "google",
}

export interface AuthProvider {
	id: AuthProviderId;
	login: (redirectURI?: string) => void;
}

export interface LogoutOptions {
	logout_openid_connect_provider?: boolean;
}

export class Client {
	constructor(config?: ClientConfig) {
		this.baseURL = config?.baseURL || this.baseURL;
		this.extraHeaders = config?.extraHeaders;
		this.user = null;
		this.customFetch = config?.customFetch;
	}
	private logoutCallback: undefined | (() => void);
	public setLogoutCallback(cb: () => void) {
		this.logoutCallback = cb;
	}
	public setExtraHeaders = (headers: Headers) => {
		this.extraHeaders = headers;
	};
	private customFetch?: (input: RequestInfo, init?: RequestInit) => Promise<globalThis.Response>;
	private extraHeaders?: Headers;
	private readonly baseURL: string = "http://localhost:9991";
	private readonly applicationHash: string = "41350f7f";
	private readonly applicationPath: string = "api/main";
	private readonly sdkVersion: string = "1.0.0-next.18";
	private csrfToken: string | undefined;
	private user: User | null;
	private userListener: UserListener<User> | undefined;
	public setUserListener = (listener: UserListener<User>) => {
		this.userListener = listener;
	};
	private setUser = (user: User | null) => {
		if (
			(user === null && this.user !== null) ||
			(user !== null && this.user === null) ||
			JSON.stringify(user) !== JSON.stringify(this.user)
		) {
			this.user = user;
			if (this.userListener !== undefined) {
				this.userListener(this.user);
			}
		}
	};
	public query = {
		AllUsers: async (options: RequestOptions<AllUsersInput, AllUsersResponse>) => {
			return await this.doFetch<AllUsersResponse>({
				method: "GET",
				path: "AllUsers",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		Countries: async (options: RequestOptions<never, CountriesResponse>) => {
			return await this.doFetch<CountriesResponse>({
				method: "GET",
				path: "Countries",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		Germany: async (options: RequestOptions<never, GermanyResponse>) => {
			return await this.doFetch<GermanyResponse>({
				method: "GET",
				path: "Germany",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		Hello: async (options: RequestOptions<never, HelloResponse>) => {
			return await this.doFetch<HelloResponse>({
				method: "GET",
				path: "Hello",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		Messages: async (options: RequestOptions<never, MessagesResponse>) => {
			return await this.doFetch<MessagesResponse>({
				method: "GET",
				path: "Messages",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		MockQuery: async (options: RequestOptions<never, MockQueryResponse>) => {
			return await this.doFetch<MockQueryResponse>({
				method: "GET",
				path: "MockQuery",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		Query: async (options: RequestOptions<never, QueryResponse>) => {
			return await this.doFetch<QueryResponse>({
				method: "GET",
				path: "Query",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		Us: async (options: RequestOptions<never, UsResponse>) => {
			return await this.doFetch<UsResponse>({
				method: "GET",
				path: "Us",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		UserInfo: async (options: RequestOptions<never, UserInfoResponse>) => {
			return await this.doFetch<UserInfoResponse>({
				method: "GET",
				path: "UserInfo",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
	};
	public mutation = {
		AddMessage: async (options: RequestOptions<AddMessageInput, AddMessageResponse>) => {
			return await this.doFetch<AddMessageResponse>({
				method: "POST",
				path: "AddMessage",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		ChangeUserName: async (options: RequestOptions<ChangeUserNameInput, ChangeUserNameResponse>) => {
			return await this.doFetch<ChangeUserNameResponse>({
				method: "POST",
				path: "ChangeUserName",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		DeleteAllMessagesByUserEmail: async (
			options: RequestOptions<DeleteAllMessagesByUserEmailInput, DeleteAllMessagesByUserEmailResponse>
		) => {
			return await this.doFetch<DeleteAllMessagesByUserEmailResponse>({
				method: "POST",
				path: "DeleteAllMessagesByUserEmail",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
		UpdateUser: async (options: RequestOptions<UpdateUserInput, UpdateUserResponse>) => {
			return await this.doFetch<UpdateUserResponse>({
				method: "POST",
				path: "UpdateUser",
				input: options.input,
				abortSignal: options.abortSignal,
			});
		},
	};

	public liveQuery = {
		AllUsers: (
			options: RequestOptions<AllUsersInput, AllUsersResponse>,
			cb: (response: Response<AllUsersResponse>) => void
		) => {
			return this.startSubscription<AllUsersResponse>(
				{
					method: "GET",
					path: "AllUsers",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		Countries: (
			options: RequestOptions<never, CountriesResponse>,
			cb: (response: Response<CountriesResponse>) => void
		) => {
			return this.startSubscription<CountriesResponse>(
				{
					method: "GET",
					path: "Countries",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		Germany: (options: RequestOptions<never, GermanyResponse>, cb: (response: Response<GermanyResponse>) => void) => {
			return this.startSubscription<GermanyResponse>(
				{
					method: "GET",
					path: "Germany",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		Hello: (options: RequestOptions<never, HelloResponse>, cb: (response: Response<HelloResponse>) => void) => {
			return this.startSubscription<HelloResponse>(
				{
					method: "GET",
					path: "Hello",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		Messages: (
			options: RequestOptions<never, MessagesResponse>,
			cb: (response: Response<MessagesResponse>) => void
		) => {
			return this.startSubscription<MessagesResponse>(
				{
					method: "GET",
					path: "Messages",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		MockQuery: (
			options: RequestOptions<never, MockQueryResponse>,
			cb: (response: Response<MockQueryResponse>) => void
		) => {
			return this.startSubscription<MockQueryResponse>(
				{
					method: "GET",
					path: "MockQuery",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		Query: (options: RequestOptions<never, QueryResponse>, cb: (response: Response<QueryResponse>) => void) => {
			return this.startSubscription<QueryResponse>(
				{
					method: "GET",
					path: "Query",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		Us: (options: RequestOptions<never, UsResponse>, cb: (response: Response<UsResponse>) => void) => {
			return this.startSubscription<UsResponse>(
				{
					method: "GET",
					path: "Us",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
		UserInfo: (
			options: RequestOptions<never, UserInfoResponse>,
			cb: (response: Response<UserInfoResponse>) => void
		) => {
			return this.startSubscription<UserInfoResponse>(
				{
					method: "GET",
					path: "UserInfo",
					input: options.input,
					abortSignal: options.abortSignal,
					liveQuery: true,
				},
				cb
			);
		},
	};

	private doFetch = async <T>(fetchConfig: FetchConfig): Promise<Response<T>> => {
		try {
			const params =
				fetchConfig.method !== "POST"
					? this.queryString({
							wg_variables: fetchConfig.input,
							wg_api_hash: this.applicationHash,
					  })
					: "";
			if (fetchConfig.method === "POST" && this.csrfToken === undefined) {
				const f = this.customFetch || fetch;
				const res = await f(this.baseURL + "/" + this.applicationPath + "/auth/cookie/csrf", {
					credentials: "include",
					mode: "cors",
				});
				this.csrfToken = await res.text();
			}
			const headers: Headers = {
				...this.extraHeaders,
				Accept: "application/json",
				"WG-SDK-Version": this.sdkVersion,
			};
			if (fetchConfig.method === "POST") {
				if (this.csrfToken) {
					headers["X-CSRF-Token"] = this.csrfToken;
				}
			}
			const body = fetchConfig.method === "POST" ? JSON.stringify(fetchConfig.input) : undefined;
			const data = await this.fetch(
				this.baseURL + "/" + this.applicationPath + "/operations/" + fetchConfig.path + params,
				{
					headers,
					body,
					method: fetchConfig.method,
					signal: fetchConfig.abortSignal,
					credentials: "include",
					mode: "cors",
				}
			);
			return {
				status: "ok",
				body: data,
			};
		} catch (e: any) {
			return {
				status: "error",
				message: e,
			};
		}
	};
	private inflight: {
		[key: string]: {
			reject: (reason?: any) => void;
			resolve: (value: globalThis.Response | PromiseLike<globalThis.Response>) => void;
		}[];
	} = {};
	private fetch = (input: globalThis.RequestInfo, init?: RequestInit): Promise<any> => {
		const key = input.toString();
		return new Promise<any>(async (resolve, reject) => {
			if (this.inflight[key]) {
				this.inflight[key].push({ resolve, reject });
				return;
			}
			this.inflight[key] = [{ resolve, reject }];
			try {
				const f = this.customFetch || fetch;
				const res = await f(input, init);
				const inflight = this.inflight[key];
				if (res.status === 200) {
					const json = await res.json();
					delete this.inflight[key];
					setTimeout(() => {
						inflight.forEach((cb) => cb.resolve(json));
					}, 0);
				}
				if (res.status >= 401 && res.status <= 499) {
					this.csrfToken = undefined;
					delete this.inflight[key];
					inflight.forEach((cb) => cb.reject("unauthorized"));
					this.fetchUser();
				}
			} catch (e: any) {
				const inflight = this.inflight[key];
				delete this.inflight[key];
				inflight.forEach((cb) => cb.reject(e));
			}
		});
	};

	private startSubscription = <T>(fetchConfig: FetchConfig, cb: (response: Response<T>) => void) => {
		(async () => {
			try {
				const params = this.queryString({
					wg_variables: fetchConfig.input,
					wg_live: fetchConfig.liveQuery === true ? true : undefined,
				});
				const f = this.customFetch || fetch;
				const response = await f(
					this.baseURL + "/" + this.applicationPath + "/operations/" + fetchConfig.path + params,
					{
						headers: {
							...this.extraHeaders,
							"Content-Type": "application/json",
							"WG-SDK-Version": this.sdkVersion,
						},
						method: fetchConfig.method,
						signal: fetchConfig.abortSignal,
						credentials: "include",
						mode: "cors",
					}
				);
				if (response.status === 401) {
					this.csrfToken = undefined;
					return;
				}
				if (response.status !== 200 || response.body == null) {
					return;
				}
				const reader = response.body.getReader();
				const decoder = new TextDecoder();
				let message: string = "";
				while (true) {
					const { value, done } = await reader.read();
					if (done) break;
					if (!value) continue;
					message += decoder.decode(value);
					if (message.endsWith("\n\n")) {
						cb({
							status: "ok",
							body: JSON.parse(message.substring(0, message.length - 2)),
						});
						message = "";
					}
				}
			} catch (e: any) {
				cb({
					status: "error",
					message: e,
				});
			}
		})();
	};

	private queryString = (input?: Object): string => {
		if (!input) {
			return "";
		}
		const query = (Object.keys(input) as Array<keyof typeof input>)
			// @ts-ignore
			.filter((key) => input[key] !== undefined && input[key] !== "")
			.map((key) => {
				const value = typeof input[key] === "object" ? JSON.stringify(input[key]) : input[key];
				const encodedKey = encodeURIComponent(key);
				// @ts-ignore
				const encodedValue = encodeURIComponent(value);
				return `${encodedKey}=${encodedValue}`;
			})
			.join("&");
		return query === "" ? query : "?" + query;
	};
	public fetchUser = async (revalidate?: boolean): Promise<User | null> => {
		try {
			const revalidateTrailer = revalidate === undefined ? "" : "?revalidate=true";
			const f = this.customFetch || fetch;
			const response = await f(this.baseURL + "/" + this.applicationPath + "/auth/cookie/user" + revalidateTrailer, {
				headers: {
					...this.extraHeaders,
					"Content-Type": "application/json",
					"WG-SDK-Version": this.sdkVersion,
				},
				method: "GET",
				credentials: "include",
				mode: "cors",
			});
			if (response.status === 200) {
				const user = await response.json();
				this.setUser(user);
				return this.user;
			}
		} catch {}
		this.setUser(null);
		return null;
	};
	public login: Record<AuthProviderId, AuthProvider["login"]> = {
		github: (redirectURI?: string): void => {
			this.startLogin(AuthProviderId.github, redirectURI);
		},
		google: (redirectURI?: string): void => {
			this.startLogin(AuthProviderId.google, redirectURI);
		},
	};
	public authProviders: Array<AuthProvider> = [
		{
			id: AuthProviderId.github,
			login: this.login[AuthProviderId.github],
		},
		{
			id: AuthProviderId.google,
			login: this.login[AuthProviderId.google],
		},
	];
	public logout = async (options?: LogoutOptions): Promise<boolean> => {
		const f = this.customFetch || fetch;
		const response = await f(
			this.baseURL + "/" + this.applicationPath + "/auth/cookie/user/logout" + this.queryString(options),
			{
				headers: {
					...this.extraHeaders,
					"Content-Type": "application/json",
					"WG-SDK-Version": this.sdkVersion,
				},
				method: "GET",
				credentials: "include",
				mode: "cors",
			}
		);
		this.setUser(null);
		if (this.logoutCallback) {
			this.logoutCallback();
		}
		return response.status === 200;
	};
	private startLogin = (providerID: AuthProviderId, redirectURI?: string) => {
		const query = this.queryString({
			redirect_uri: redirectURI || window.location.toString(),
		});
		window.location.replace(`${this.baseURL}/${this.applicationPath}/auth/cookie/authorize/${providerID}${query}`);
	};
}
