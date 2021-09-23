import { match, matchPath } from "react-router";
import { initialState } from "./redux/reducers/reducer_search";
import { navData } from "./App";

const DATA: Record<string, (route: match) => Promise<any>> = {
  dashboard(route) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...initialState,
        });
      }, 150);
    });
  },
};

function fetchDataByUrl(url: string): Promise<any> {
  let route: match | undefined;

  const routeConfig = navData.find(({ path }) => {
    const matchedRoute = matchPath(url, path);

    if (matchedRoute) {
      route = matchedRoute;
      return true;
    }

    return false;
  });

  if (route && DATA[routeConfig!.key]) {
    return DATA[routeConfig!.key](route);
  }

  return Promise.resolve({});
}

export default fetchDataByUrl;
