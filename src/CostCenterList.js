import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

class CostCenterList extends React.Component {
  render() {
    return (
      <div className="cost-centers">
        {this.props.costCenters.map((costCenter) => (
          <div key={costCenter} className="cost-center">
            <h3>{costCenter}</h3>
            <Droppable droppableId={costCenter}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="cost-center-content"
                >
                  {this.props.classifiedInvoices[costCenter]?.map((supplier) => (
                    <div key={supplier.id} className="supplier-card">
                      <h4>{supplier.name}</h4>
                      <ul>
                        {supplier.invoices.map((invoice) => (
                          <li key={invoice}>{invoice}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    );
  }
}

export default CostCenterList;
