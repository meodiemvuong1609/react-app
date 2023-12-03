import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

function CardRoom({room, chatRoom}) {
  return (
    <div className={clsx('flex items-center p-2 justify-between cursor-pointer rounded-lg hover:bg-gray-light-1', {'bg-red-light-4': room.id==chatRoom?.id})}>
      <div className={clsx('flex items-center w-full p-2', )}>
        <div className="w-12 h-12 rounded-full bg-gray-300">
          <Image 
            src='/avt-default.png'
            alt='avt'
            width={48}
            height={48}
          />
        </div>
        <div className="ml-2">
          <p className="text-gray-800 font-semibold">{room.title}</p>
          <p className="text-sm text-gray-600">{room.type}</p>
        </div>
        
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-gray-600">12:00</p>
        <div className="w-4 h-4 bg-green-500 rounded-full self-end"></div>
      </div>
    </div>
  )
}

export default CardRoom