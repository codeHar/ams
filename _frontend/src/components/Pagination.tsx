import { leftIcon, rightIcon } from "../assets/svg";
import { SETTINGS } from "../consts";

type PaginationType = {
  currentPage: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
};

const Pagination = ({
  currentPage = 1,
  setPageNo,
  totalCount = 1,
}: PaginationType) => {
  const maxPage = Math.ceil(totalCount / SETTINGS.PAGE_SIZE);
  console.log({ maxPage });
  const onPrev = () => {
    setPageNo((prev) => Math.max(1, (prev -= 1)));
  };

  const onNext = () => {
    setPageNo((prev) => Math.min(maxPage, (prev += 1)));
  };

  return (
    <div className="pagination-container w-full h-12 bg-gray-200 p-3 flex justify-center relative">
      <div className="flex gap-3 items-center">
        <span onClick={onPrev}>{leftIcon}</span>
        <span className="py-1 px-3 bg-white rounded-sm font-semibold">
          {currentPage}
        </span>
        <span onClick={onNext}>{rightIcon}</span>
      </div>

      <div className="absolute right-0 -translate-x-full top-1/2 -translate-y-1/2">
        <h5>Total: {totalCount}</h5>
      </div>
    </div>
  );
};

export default Pagination;
