import React from 'react'

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
  activeClass,
}) => {
  return (
    <ul className="list-group mb-3">
      {items.map((item, index) => (
        <li
          onClick={() => onItemSelect(item, index)}
          style={{ cursor: 'pointer' }}
          key={item[valueProperty]}
          className={
            index === activeClass ? 'list-group-item active' : 'list-group-item'

            //! removed this line because we cannot add active class on the first genre Category on dom load
            //! item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
}

export default ListGroup
