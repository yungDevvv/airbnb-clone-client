import React from 'react'
import s from './index.module.scss'

const PageLoader = () => {
  return (
    <div className='page-loader center'>
      <div className={s.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default PageLoader