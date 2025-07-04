import { formatDateTime, cn } from '@/lib/utils'
import React from 'react'

const FormattedDateTime = ({date, className}) => {
  return (
    <p className={cn("body-1 text-light-200", className)}>
        {formatDateTime(date)}
    </p>
  )
}

export default FormattedDateTime