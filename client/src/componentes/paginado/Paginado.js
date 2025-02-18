const Paginado = ({ totalResults, totalPages, currentPage, changePage }) => {
    return (
        <div className="cPaginado mb-2 p-0">
            <div className="w-100 d-flex justify-content-center align-items-center">
                <span className="me-3">{totalResults} resultados</span>
                <span className="me-3">
                    Página {currentPage < 1 ? 1 : currentPage} de {totalPages}
                </span>
                <span>
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-pagination"
                            onClick={() => changePage(1)}
                            disabled={currentPage === 1}
                        >
                            <i className="fa fa-fast-backward" aria-hidden="true"></i>
                        </button>
                        <button
                            className="btn btn-pagination"
                            onClick={() => changePage(+currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <i className="fa fa-step-backward" aria-hidden="true"></i>
                        </button>
                        <input
                            type="number"
                            value={currentPage}
                            name="page"
                            onClick={(e) => e.target.select()}
                            onChange={(e) =>
                                changePage(+e.target.value, totalPages)
                            }
                            min="1"
                            max={totalPages}
                            className="input-pagination p-0 btn"
                        />
                        <button
                            className="btn btn-pagination"
                            onClick={() => changePage(+currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <i className="fa fa-step-forward" aria-hidden="true"></i>
                        </button>
                        <button
                            className="btn btn-pagination"
                            onClick={() => changePage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            <i className="fa fa-fast-forward" aria-hidden="true"></i>
                        </button>
                    </div>
                </span>
                <br />
            </div>
        </div>
    );
};

export default Paginado
