import React, { ReactElement } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import useDataFetching from "./useDataFetching";

interface Props {}

export default function RepositoriesHooks({}: Props): ReactElement {
  const { loading, results, error } = useDataFetching({
    dataSource: "http://census.daybreakgames.com/get/ps2/item?item_id=]1&c:limit=50&c:show=description.en,item_id,name.en,image_path",
  });

  const match = useRouteMatch();

  if (loading || error) {
    return loading ? "Loading..." : error.message;
  }

  return (
    <>
      <h1>Hook</h1>
      <ul>
        {results &&
          results.map(({ item_id, name }) => (
            <Link to={`${match.url}/${item_id}`}>
              <li key={item_id}>{name ? name.en : "no Name(("}</li>
            </Link>
          ))}
      </ul>
    </>
  );
}
