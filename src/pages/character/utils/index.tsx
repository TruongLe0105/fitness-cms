import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { CharacterDetail } from "../types";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { BSC_SCAN_URL } from "config/environments";

export function dataHeaderUser(
  // handleOpenUpdateList: (
  //   key: "edit" | "delete" | "view-detail",
  //   value: NotificationDetail
  // ) => () => void
  handleOpenUpdateList: (
    key: "edit" | "delete" | "view-detail",
    value: CharacterDetail
  ) => () => void
): Header[] {
  const headers: Header[] = [
    {
      // title: "Name",
      // field: "name",
      title: "id",
      field: "id",
      styleHeader: {
        // minWidth: 200,
        // maxWidth: 200,
        minWidth: 100,
        maxWidth: 100,
      },
      styleBody: {
        minWidth: 100,
        maxWidth: 100,
      },
      // sort: true,

      renderBody: (value: CharacterDetail) => (
        <p
          // onClick={handleOpenUpdateList("view-detail", value)}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="text-primary-custom whitespace-pre-line cursor-pointer"
        >
          {value.id}
        </p>
      ),
    },

    {
      title: "name",
      field: "name",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.name}
        </p>
      ),
    },
    {
      title: "krName",
      field: "krName",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      // sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.krName}
        </p>
      ),
    },
    {
      title: "image",
      field: "image",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      // sort: true,
      renderBody: (value: CharacterDetail) => <img src={value.image}></img>,
    },
    {
      title: "rarity",
      field: "rarity",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.rarity}
        </p>
      ),
    },
    {
      title: "attack",
      field: "attack",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.attack}
        </p>
      ),
    },
    {
      title: "amour",
      field: "amour",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.amour}
        </p>
      ),
    },
    {
      title: "maxHp",
      field: "maxHp",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.maxHp}
        </p>
      ),
    },
    {
      title: "dex",
      field: "dex",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.dex}
        </p>
      ),
    },
    {
      title: "moveCount",
      field: "moveCount",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.moveCount}
        </p>
      ),
    },
    {
      title: "moveTime",
      field: "moveTime",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.moveTime}
        </p>
      ),
    },
    {
      title: "skill",
      field: "skill",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.skill}
        </p>
      ),
    },

    {
      title: "Created At",
      field: "createdAt",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p>{value.createdAt ? formatDate(value.createdAt) : ""}</p>
      ),
    },
    {
      title: "Updated At",
      field: "updatedAt",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      sort: true,
      renderBody: (value: CharacterDetail) => (
        <p>{value.updatedAt ? formatDate(value.updatedAt) : ""}</p>
      ),
    },
    // {
    //   title: "Action",
    //   field: "action",
    //   styleSort: {
    //     justifyContent: "flex-end",
    //   },
    //   styleHeader: {
    //     paddingLeft: 10,
    //     width: "100vh",
    //     minWidth: 100,
    //   },
    //   styleBody: {
    //     paddingLeft: 10,
    //     width: "100vh",
    //     minWidth: 100,
    //   },
    //   renderBody: (value: CharacterDetail) => (
    //     <div className="flex items-center justify-end">
    //       <div className="ml-2">
    //         <DefaultButtonIcon
    //           disable={!value.id ? true : false}
    //           onClick={handleOpenUpdateList("edit", value)}
    //           field="edit"
    //           titleTooltip="Update"
    //           keyButtonIcon={Math.random().toString(36)}
    //         />
    //       </div>
    //       <div className="ml-2">
    //         <DefaultButtonIcon
    //           disable={!value.id ? true : false}
    //           onClick={handleOpenUpdateList("delete", value)}
    //           field="delete"
    //           titleTooltip="Destroy"
    //           keyButtonIcon={Math.random().toString(36)}
    //         />
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  return headers;
}
