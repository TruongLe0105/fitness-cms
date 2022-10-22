import * as React from "react";
import { getListVersionsMiddleware } from "../services/api";
const useVersionsHook = (params) => {
    const [versions, setVersions] = React.useState([]);
    const [totalVersion, setTotalVersion] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        (async () => {
            setIsLoading(true);
            const { items, total } = await getListVersionsMiddleware(params);
            setTotalVersion(total);
            setVersions([...items]);
            setIsLoading(false);
        })();
    }, [params.limit, params.page, params.search, params.refetch]);
    return { versions, totalVersion, isLoading };
};
export default useVersionsHook;
