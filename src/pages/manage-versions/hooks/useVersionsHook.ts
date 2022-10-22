import { ParamsRequest } from "interfaces";
import * as React from "react";
import { ManageVersion } from "../interfaces";
import { getListVersionsMiddleware } from "../services/api";

const useVersionsHook = (
  params: ParamsRequest
): { versions: ManageVersion[]; totalVersion: number; isLoading: boolean } => {
  const [versions, setVersions] = React.useState<ManageVersion[]>([]);
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
