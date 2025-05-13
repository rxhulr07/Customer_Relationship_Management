import { useState, useEffect } from 'react'
import { getCustomers } from '../../services/customer'
import '../../styles/components/customer-list.css'

export default function CustomerList() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers()
        setCustomers(data)
      } catch (error) {
        console.error('Error fetching customers:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  if (loading) {
    return <div className="loading">Loading customers...</div>
  }

  return (
    <div className="customer-list">
      <div className="list-header">
        <h3>Customer List</h3>
        <button className="btn-primary">Add Customer</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Spend</th>
            <th>Visits</th>
            <th>Last Active</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>${customer.totalSpend.toFixed(2)}</td>
              <td>{customer.totalVisits}</td>
              <td>{new Date(customer.lastActive).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}