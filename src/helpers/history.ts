import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

// eslint-disable-next-line
export const pushTo = (path: string, params?: {}, props?: any) => {
  let pathWithParams = path;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      pathWithParams = pathWithParams.replace(":" + key, value as string);
    }
  }
  history.push(pathWithParams, props);
};
