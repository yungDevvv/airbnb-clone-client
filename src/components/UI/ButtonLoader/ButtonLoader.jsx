import React from 'react'

const ButtonLoader = ({color}) => {
  return (
    <i style={color && {color: color}} className="lni lni-spinner-solid loading"></i>
  )
}

export default ButtonLoader