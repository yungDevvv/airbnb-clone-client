import React from 'react'
import s from './index.module.scss'

const SearchButton = ({style, callback}) => {
  return (
    <button className={s.button} style={{...style}} onClick={callback}>
        <i className="lni lni-search-alt"></i>
    </button>
  )
}

export default SearchButton;