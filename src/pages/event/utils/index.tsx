import { Header } from "components/Table/types";
import { formatDate, getNameStatusEvent } from "helpers/util";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { EventDetail } from "../types";
import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import StatusEventCard from "components/Status/StatusEventCard";

export function dataHeaderEvent(
  handleOpenUpdateList: (
    key: "edit" | "delete" | "viewDetail",
    value: EventDetail
  ) => () => void,
  handlePauseEvent: (value: EventDetail) => () => void
): Header[] {
  const headers: Header[] = [
    {
      title: "Image",
      field: "url",
      styleHeader: {
        paddingRight: 0,
        paddingLeft: 25,
        width: 100,
        minWidth: 100,
        justifyContent: "center",
      },
      styleBody: {
        paddingRight: 0,
        paddingLeft: 0,
        width: 100,
        minWidth: 100,
        textAlign: "center",
      },
      renderBody: (value: EventDetail) => (
        <div className="flex justify-center cursor-pointer py-2">
          <div
            style={{
              backgroundImage: `url(${value.url ?? IconDefaultAvatar})`,
            }}
            onClick={handleOpenUpdateList("viewDetail", value)}
            className="w-82-custom h-115-custom rounded-lg bg-no-repeat bg-center bg-cover"
          />
        </div>
      ),
    },
    {
      title: "Name",
      field: "name",
      styleHeader: {
        minWidth: 150,
        maxWidth: 150,
        paddingLeft: 10,
        paddingRight: 10,
      },
      styleBody: {
        minWidth: 150,
        maxWidth: 150,
        paddingLeft: 10,
        paddingRight: 10,
      },
      sort: true,
      renderBody: (value: EventDetail) => (
        <p
          className="text-primary-custom whitespace-pre-line cursor-pointer"
          onClick={handleOpenUpdateList("viewDetail", value)}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 5,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {value.name}
        </p>
      ),
    },
    {
      title: "Description",
      field: "description",
      styleHeader: {
        paddingLeft: 10,
        paddingRight: 10,
        width: 300,
        minWidth: 300,
        maxWidth: 300,
      },
      styleBody: {
        width: 300,
        minWidth: 300,
        maxWidth: 300,
        paddingLeft: 10,
        paddingRight: 10,
      },
      sort: true,
      renderBody: (value: EventDetail) => (
        <p
          className="whitespace-pre-line"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 5,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {value.description}
        </p>
      ),
    },
    // {
    //   title: "Target URL",
    //   field: "target",
    //   styleHeader: {
    //     minWidth: 150,
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //   },
    //   styleBody: {
    //     minWidth: 150,
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //   },
    //   renderBody: (value: EventDetail) => (
    //     <p>
    //       {value.target ? (
    //         <a
    //           href={
    //             value.target.indexOf("http")
    //               ? `//${value.target}`
    //               : value.target
    //           }
    //           style={{
    //             overflow: "hidden",
    //             textOverflow: "ellipsis",
    //             WebkitLineClamp: 5,
    //             display: "-webkit-box",
    //             WebkitBoxOrient: "vertical",
    //           }}
    //           target="_blank"
    //           className="work-break-custom whitespace-pre-line hover:text-primary-custom cursor-pointer hover:underline"
    //         >
    //           {value.target}
    //         </a>
    //       ) : null}
    //     </p>
    //   ),
    // },
    {
      title: "Start Date",
      field: "startDate",
      styleHeader: {
        width: 200,
        minWidth: 200,
        maxWidth: 200,
        paddingLeft: 10,
        paddingRight: 10,
      },
      styleBody: {
        width: 200,
        minWidth: 200,
        maxWidth: 200,
        paddingLeft: 10,
        paddingRight: 10,
      },
      renderBody: (value: EventDetail) => (
        <p>
          {value.startDate
            ? formatDate(value.startDate, "dd MMM yyyy, HH:mm:ss a")
            : ""}
        </p>
      ),
    },
    {
      title: "End Date",
      field: "endDate",
      styleHeader: {
        width: 200,
        minWidth: 200,
        maxWidth: 200,
        paddingLeft: 10,
        paddingRight: 10,
      },
      styleBody: {
        width: 200,
        minWidth: 200,
        maxWidth: 200,
        paddingLeft: 10,
        paddingRight: 10,
      },
      renderBody: (value: EventDetail) => (
        <p>
          {value.endDate
            ? formatDate(value.endDate, "dd MMM yyyy, HH:mm:ss a")
            : ""}
        </p>
      ),
    },
    {
      title: "Status",
      field: "send",

      styleHeader: {
        minWidth: 100,
        maxWidth: 100,
        width: 100,
        paddingLeft: 10,
        paddingRight: 10,
      },
      styleBody: {
        minWidth: 100,
        maxWidth: 100,
        width: 100,
        paddingLeft: 10,
        paddingRight: 10,
      },
      renderBody: (value: EventDetail) => (
        <StatusEventCard
          status={getNameStatusEvent(value.startDate, value.endDate)}
        />
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
      renderBody: (value: EventDetail) => (
        <p>{value.createdAt ? formatDate(value.createdAt) : ""}</p>
      ),
    },
    {
      title: "Pause",
      field: "paused",
      styleHeader: {
        paddingLeft: 10,
        width: "80vh",
        minWidth: 80,
      },
      styleBody: {
        paddingLeft: 10,
        width: 34,
        minWidth: 34,
      },
      renderBody: (value: EventDetail) => (
        <DefaultButtonIcon
          onClick={handlePauseEvent(value)}
          disable={false}
          field={value.send ? "pause" : "resume"}
          titleTooltip={value.send ? "Pause" : "Resume"}
          keyButtonIcon={Math.random().toString(36)}
        />
      ),
    },
    {
      title: "Action",
      field: "action",
      styleSort: {
        justifyContent: "flex-end",
      },
      styleHeader: {
        paddingLeft: 10,
        width: "100vh",
        minWidth: 100,
      },
      styleBody: {
        paddingLeft: 10,
        width: "100vh",
        minWidth: 100,
      },
      renderBody: (value: EventDetail) => (
        <div className="flex items-center justify-end">
          <div className="ml-2">
            <DefaultButtonIcon
              disable={false}
              onClick={handleOpenUpdateList("edit", value)}
              field="edit"
              titleTooltip="Update"
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>
          <div className="ml-2">
            <DefaultButtonIcon
              onClick={handleOpenUpdateList("delete", value)}
              disable={false}
              field="delete"
              titleTooltip="Destroy"
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>
        </div>
      ),
    },
  ];

  return headers;
}
