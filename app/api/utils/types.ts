export type RequestMethod = "get" | "post" | "put" | "delete" | "patch";
export type RequestData = any | undefined;

export type ApiRequestOptions = {
  /**
   * Request method type
   *  - @see RequestMethod
   *  - @default: 'get'
   */
  method?: RequestMethod;
  /**
   * `params` are the URL parameters to be sent with the request
   * NOTE: params that are null or undefined are not rendered in the URL.
   */
  params?: Record<string, string>;
  /**
   * Request headers
   */
  headers?: Record<string, string>;
  /**
   * Request data
   */
  data?: RequestData;
  /**
   * ACCESS_TOKEN to use for Authorization
   *
   * Used to apply Authorization request header with the token
   */
  accessToken?: string | undefined;
  /**
   * Initial delay in milliseconds
   *   - Used for testing loading states
   *  - @default: 0
   */
  initialDelay?: number;
};
