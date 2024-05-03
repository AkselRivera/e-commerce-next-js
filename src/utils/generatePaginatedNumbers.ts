export const generatePagination = (currentPage: number, totalPages: number) => {
  // Si el numero total es 7 o menos, mostrar todo

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  //   Si se encuentra entre las primeras 3 paginas mostrar [1,2,3, ..., totalPages-1, totalPages]
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Si se encuentra entre las ultimas 3 paginas mostrar [1, ..., totalPages-2, totalPages-1, totalPages]
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Si se encuentra entre las paginas intermedias mostrar [1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages]
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
