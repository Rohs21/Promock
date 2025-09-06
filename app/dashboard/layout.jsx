import React from 'react'
import Header from './_components/Header'

function Dashboardlayout({children}) {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  )
}

export default Dashboardlayout
