import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'

// Barra que contiene barra de búsqueda, criterios de ordenacion y botón 'crear' para tablas
const TableFilterBar = ({searchTerm, setSearchTerm, onSearch, clearSearch, sortOptions, sortKey, setSort, showBtn, btnText, onBtnClick, sortOrder, setSortOrder}) => {

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  return (
    <Row className='align-items-center mb-2'>
        {/*primera columna: search bar*/ }
        <Col md={6} className="d-flex align-items-center gap-2">
            <input type="text" className="form-control"
            placeholder="Buscar..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-primary" onClick={onSearch}>
              <i className="material-icons align-middle">search</i>
            </Button>
            <Button variant="outline-secondary" onClick={clearSearch}>
              <i className="material-icons align-middle">filter_alt_off</i>
            </Button>
        </Col>
        {/*segunda columna: filtro de ordenacion*/}
        <Col md={4} className="d-flex align-items-center justify-content-evenly">
         <span
          className="material-icons"
          style={{ cursor: 'pointer' }}
          onClick={toggleSortOrder}
          title={`Orden actual: ${sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}`}
        >
          {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
        </span>
          <select
            className="form-select"
            value={sortKey}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Col>
        {/* ultima columna: boton */}
        {
          showBtn &&
          <Col md={2}>
            <Button variant="primary" onClick={onBtnClick} className="d-flex align-items-center gap-2"><span className="material-icons">add_circle</span>{btnText}</Button>
          </Col>
        }

    </Row>
  )
}

export default TableFilterBar