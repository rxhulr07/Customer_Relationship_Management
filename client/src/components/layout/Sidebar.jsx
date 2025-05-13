import { NavLink } from 'react-router-dom'
import '../../styles/layout/sidebar.css'

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/customers">Customers</NavLink>
          </li>
          <li>
            <NavLink to="/segments">Segments</NavLink>
          </li>
          <li>
            <NavLink to="/campaigns">Campaigns</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}