import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import InvoiceList from './InvoiceList.js'
import CostCenterList from './CostCenterList.js'
import './App.css'
import ReactDOM from 'react-dom'

const initialInvoices = [
  { id: 'fornecedor1', name: 'Fornecedor 1', invoices: ['NF001', 'NF002'] },
  { id: 'fornecedor2', name: 'Fornecedor 2', invoices: ['NF003', 'NF004'] },
  // Adicione mais fornecedores e notas fiscais conforme necessário
]

const costCenters = ['RPO', 'SPO', 'CPS', 'BRU', 'SJR']

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoices: initialInvoices,
      classifiedInvoices: {}
    }
  }

  onDragEnd = (result) => {
    const { source, destination, draggableId } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    const newClassifiedInvoices = { ...this.state.classifiedInvoices }
    const costCenter = destination.droppableId
    const supplierGroup = this.state.invoices.find(supplier => supplier.id === draggableId)

    if (supplierGroup) {
      newClassifiedInvoices[costCenter] = [
        ...(newClassifiedInvoices[costCenter] || []),
        supplierGroup
      ]

      this.setState({
        classifiedInvoices: newClassifiedInvoices,
        invoices: this.state.invoices.filter(supplier => supplier.id !== draggableId)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="container">
            <div className="invoice-list">
              <h2>Notas Fiscais por Fornecedor</h2>
              <InvoiceList invoices={this.state.invoices} />
            </div>
            <div className="cost-center-list">
              <h2>Centros de Custo</h2>
              <CostCenterList 
                costCenters={costCenters} 
                classifiedInvoices={this.state.classifiedInvoices} 
              />
            </div>
          </div>
        </DragDropContext>
      </div>
    )
  }
}

export default App

ReactDOM.render(
    <App/>, document.querySelector('#root')
)