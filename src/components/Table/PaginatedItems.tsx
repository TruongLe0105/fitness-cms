import ReactPaginate from "react-paginate";
import { PaginatedItemsProps } from "./types";

const PaginatedItems = (props: PaginatedItemsProps): JSX.Element => {
  const { limit, page, countItems, handleChangePage } = props;
  const pageCount = Math.ceil(countItems / limit);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (event: any) => {
    handleChangePage(Number(event.selected) + 1);
  };
  if (pageCount < 2) {
    return <div />;
  }
  return (
    <div className="flex items-center table-pagination">
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        forcePage={page - 1}
        previousLabel="<"
        pageClassName="page-item"
        previousClassName="page-item-next"
        nextClassName="page-item-next"
        breakLabel="..."
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};
export default PaginatedItems;
