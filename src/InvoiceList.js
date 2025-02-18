import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const InvoiceList = ({ invoices }) => {
  return (
    <div>
      {invoices.map(supplier => (
        <div key={supplier.id} className="supplier-container">
          <h3>{supplier.name}</h3>
          <Droppable droppableId={supplier.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="invoice-container"
              >
                {supplier.invoices.map((invoice, index) => (
                  <Draggable
                    key={invoice.id}
                    draggableId={invoice.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="invoice-item"
                      >
                        Nota Fiscal: {invoice.number}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
