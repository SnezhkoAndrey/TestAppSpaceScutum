import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { todoData } from "../../redux/tableSlice";
import "./Paginator.scss";

interface PropsType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

const Paginator = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
}: PropsType) => {
  const todo = useAppSelector(todoData);

  const buttonsToShow = 5;

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(todo.length / itemsPerPage);

  // Calculate the range of buttons to display
  const calculateButtonRange = () => {
    const totalButtons = buttonsToShow + 2;
    const middleButton = Math.floor(totalButtons / 2);

    if (currentPage <= middleButton + 1) {
      return Array.from({ length: totalButtons - 1 }).map(
        (_, index) => index + 1
      );
    } else if (currentPage >= totalPages - middleButton) {
      return Array.from({ length: totalButtons - 1 }).map(
        (_, index) => totalPages - totalButtons + index + 2
      );
    } else {
      return Array.from({ length: totalButtons - 2 }).map(
        (_, index) => currentPage - middleButton + index + 1
      );
    }
  };

  return (
    <div className="paginator">
      <div className="buttonContainer">
        {calculateButtonRange().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
            className="button"
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <div className="totalPage">Total pages: {totalPages}</div>
    </div>
  );
};

export default Paginator;
