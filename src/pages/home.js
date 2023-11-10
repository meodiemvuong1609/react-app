import React from 'react'
import { useState } from 'react'
import clsx from 'clsx'

function HomePage() {

  let [status, setStatus] = useState('pending')


  return (
    <main>
      <span className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status=== 'paid'
        }
      )}>
      Span dame
      </span>
      <button onClick={() => setStatus('paid')}>Change status</button>
    </main>
  )
}

export default HomePage