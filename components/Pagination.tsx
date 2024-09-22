export function Pagination(
  { baseUrl, currentPage, totalCount }: {
    baseUrl: string;
    currentPage: number;
    totalCount: number;
  },
) {
  const totalPage = Math.ceil(totalCount / 2);

  if (totalPage < currentPage) {
    return (
      <div className="join">
        <a className={`join-item btn`} href={`${baseUrl}?page=1`}>1</a>
        <a className={`join-item btn btn-disable`} disabled={true}>...</a>
        <a className={`join-item btn`} href={`${baseUrl}?page=${totalPage}`}>
          {totalPage}
        </a>
      </div>
    );
  }

  const pageNumbers: { page: number; disable: boolean }[] = [];

  let start = currentPage - 2;
  start = start < 1 ? 1 : start;
  let end = start + 5;
  end = end >= totalPage ? totalPage : end;

  for (let i = start; i <= end; i++) {
    pageNumbers.push({ page: i, disable: false });
  }

  if (pageNumbers[0].page > 1) {
    if (pageNumbers[0].page > 2) {
      pageNumbers.unshift({ page: 2, disable: true });
    }
    pageNumbers.unshift({ page: 1, disable: false });
  }
  if (pageNumbers[pageNumbers.length - 1].page < totalPage) {
    if (pageNumbers[pageNumbers.length - 1].page < totalPage - 1) {
      pageNumbers.push({ page: totalPage - 1, disable: true });
    }
    pageNumbers.push({ page: totalPage, disable: false });
  }

  return (
    <div className="join">
      {pageNumbers.map((page: { page: number; disable: boolean }) => {
        return page.disable
          ? <a className={`join-item btn btn-disable`} disabled={true}>...</a>
          : (
            <a
              className={`join-item btn ${
                currentPage == page.page && "btn-active"
              }`}
              href={`${baseUrl}?page=${page.page}`}
            >
              {page.page}
            </a>
          );
      })}
    </div>
  );
}
