import * as XLSX from "xlsx";
import moment from "moment";

export async function downloadExcel(data) {
  const cloneData = JSON.parse(JSON.stringify(data));

  if (!cloneData.length) {
    return;
  }
  const newData = cloneData.map((item) => {
    item.formatted_created_at = moment(item.created_at).format();
    let newIpList = "";
    item?.ip_list.length &&
      item?.ip_list.map((value, index) => {
        const mappingIp = value.slice(7);

        if (mappingIp === "127.0.0.1") {
          return;
        }

        newIpList = newIpList + mappingIp;
        if (index !== item.ip_list.length - 1) {
          newIpList = newIpList + " || ";
        }
      });

    item.ip_list = newIpList;
    return item;
  });

  const worksheet = XLSX.utils.json_to_sheet(newData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "DataSheet.xlsx");
}
