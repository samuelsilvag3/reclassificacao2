import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import InvoiceList from './InvoiceList.js'
import CostCenterList from './CostCenterList.js'
import './App.css'
import ReactDOM from 'react-dom'

const initialInvoices = [
  { 
    id: 'fornecedor1', 
    name: 'Fornecedor 1', 
    invoices: [
      { id: 'NF001', number: 'NF001' },
      { id: 'NF002', number: 'NF002' }
    ] 
  },
  { 
    id: 'fornecedor2', 
    name: 'Fornecedor 2', 
    invoices: [
      { id: 'NF003', number: 'NF003' },
      { id: 'NF004', number: 'NF004' }
    ] 
  },
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
    
    // Encontrar o fornecedor e a nota fiscal
    let foundInvoice = null
    let sourceSupplier = null

    for (const supplier of this.state.invoices) {
      const invoice = supplier.invoices.find(inv => inv.id === draggableId)
      if (invoice) {
        foundInvoice = invoice
        sourceSupplier = supplier
        break
      }
    }

    if (foundInvoice) {
      // Adicionar a nota fiscal ao centro de custo
      newClassifiedInvoices[costCenter] = [
        ...(newClassifiedInvoices[costCenter] || []),
        foundInvoice
      ]

      // Atualizar o estado removendo a nota fiscal do fornecedor original
      const newInvoices = this.state.invoices.map(supplier => {
        if (supplier.id === sourceSupplier.id) {
          return {
            ...supplier,
            invoices: supplier.invoices.filter(inv => inv.id !== draggableId)
          }
        }
        return supplier
      })

      this.setState({
        classifiedInvoices: newClassifiedInvoices,
        invoices: newInvoices
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