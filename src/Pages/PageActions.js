import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
let pageSetting = 0;
export default function PageActions({
  className,
  count,
  page,
  rowsPerPage,
  onChangePage,
  serverPagination,
}) {
  if (Math.abs(page - pageSetting) > 2) {
    pageSetting = page;
  }
  const handleBackButtonClick = (event) => {
    if (page <= 2) {
      pageSetting = pageSetting - 1;

      onChangePage(event, page - 1);
    } else {
      pageSetting = pageSetting - 1;

      onChangePage(event, page - 1);
    }
  };
  const handleButtonClick = (event, page) => {
    onChangePage(event, page);
  };
  const handleNextButtonClick = (event) => {
    pageSetting = pageSetting + 3;

    onChangePage(event, pageSetting);
  };

  let totalNoOfPage = Math.ceil(count / rowsPerPage);
  return count != 0 || serverPagination ? (
    <div className={className}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={pageSetting === 0}
        style={{
          border: '1px solid #bdbdbd',
          width: '25px',
          height: '25px',
          marginRight: '10px',
        }}
        aria-label='previous page'>
        <KeyboardArrowLeft style={{ position: 'absolute' }} />
      </IconButton>
      <IconButton
        onClick={(e) => handleButtonClick(e, pageSetting)}
        disabled={!serverPagination && pageSetting >= totalNoOfPage}
        className={`page${page}`}
        style={{
          border: '1px solid #bdbdbd',
          width: '25px',
          height: '25px',
          marginRight: '10px',
          color: page + 1 == pageSetting + 1 ? 'white' : '',
          backgroundColor: page + 1 == pageSetting + 1 ? '#478DE1' : '',
        }}>
        <span style={{ fontSize: '13px', position: 'absolute', top: '5px' }}>
          {pageSetting + 1}
        </span>
      </IconButton>
      <IconButton
        onClick={(e) => handleButtonClick(e, pageSetting + 1)}
        disabled={!serverPagination && pageSetting + 1 >= totalNoOfPage}
        style={{
          border: '1px solid #bdbdbd',
          width: '25px',
          height: '25px',
          marginRight: '10px',
          color: page + 1 == pageSetting + 2 ? 'white' : '',
          backgroundColor: page + 1 == pageSetting + 2 ? '#478DE1' : '',
        }}
        className={`page${page}`}>
        <span style={{ fontSize: '13px', position: 'absolute', top: '5px' }}>
          {pageSetting + 2}
        </span>
      </IconButton>
      <IconButton
        onClick={(e) => handleButtonClick(e, pageSetting + 2)}
        disabled={!serverPagination && pageSetting + 2 >= totalNoOfPage}
        style={{
          border: '1px solid #bdbdbd',
          width: '25px',
          height: '25px',
          marginRight: '10px',
          color: page + 1 == pageSetting + 3 ? 'white' : '',
          backgroundColor: page + 1 == pageSetting + 3 ? '#478DE1' : '',
        }}
        className={`page${page}`}>
        <span style={{ fontSize: '13px', position: 'absolute', top: '5px' }}>
          {pageSetting + 3}
        </span>
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        style={{
          border: '1px solid #bdbdbd',
          width: '25px',
          height: '25px',
          marginRight: '10px',
        }}
        disabled={
          !serverPagination && pageSetting >= Math.ceil(count / rowsPerPage) - 3
        }
        aria-label='next page'>
        <KeyboardArrowRight style={{ position: 'absolute' }} />
      </IconButton>
    </div>
  ) : null;
}
