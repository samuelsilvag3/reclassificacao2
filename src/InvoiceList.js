import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class InvoiceList extends React.Component {
  render() {
    return (
      <Droppable droppableId="invoice-list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="invoice-container"
          >
            {this.props.invoices.map((supplier, index) => (
              <Draggable
                key={supplier.id}
                draggableId={supplier.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="supplier-card"
                  >
                    <h3>{supplier.name}</h3>
                    <ul>
                      {supplier.invoices.map((invoice) => (
                        <li key={invoice}>{invoice}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default InvoiceList;
