import React from 'react' 
import UserCart from './UserCart' 
import ConfirmedOrder from './ConfirmedOrder'

const UserDashboard = ({showOnDashboard,setShowOnDashboard,user}) => {
  return (
    <div>
        {
            showOnDashboard == 'myCart' &&
            <UserCart/>
        }
        {
            showOnDashboard == 'confirmedOrder' &&
            <ConfirmedOrder/>
        }
    </div>
  )
} 
export default UserDashboard