import React, { useEffect, useState } from 'react'

interface BreadItemsProps {
  breadcrumbs: string
}
const BreadItems: React.FC<BreadItemsProps> = ({ breadcrumbs }) => {
  return <div style={{ fontSize: '15px', height: '15px', lineHeight: '35px', paddingLeft: '15px' }}>{breadcrumbs}</div>
}
export default BreadItems
