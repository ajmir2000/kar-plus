import React from 'react'
import { useParams } from 'react-router-dom'

export default function CompanyDetails() {

    const params=useParams()
    console.log(params)
  return (
    <div>
      details
    </div>
  )
}
