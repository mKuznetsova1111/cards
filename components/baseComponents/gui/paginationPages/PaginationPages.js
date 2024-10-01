import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import ReactPaginate from 'react-paginate';


export default function PaginationPages({className, children, itemsPerPage = 4}) {
  const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];

  function Items({currentItems}) {
    return (
      <div className={"pagination-page__items"}>
        {currentItems?.map((item, i) => (
          <div key={`item-${i}`}>
            <h3>Item #{item}</h3>
          </div>
        ))}
      </div>
    );
  }

  function PaginatedItems({itemsPerPage}) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    return (
      <div className={classNames("pagination-pages", className)}>
        <Items currentItems={currentItems}/>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          containerClassName={"pagination-pages__list"}
          pageClassName={"pagination-pages__item"}
          activeClassName={"pagination-pages__item_active"}
          previousClassName={"pagination-pages__button pagination-pages__button_prev"}
          nextClassName={"pagination-pages__button pagination-pages__button_next"}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }


  return <PaginatedItems itemsPerPage={itemsPerPage}/>

}
PaginationPages.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

