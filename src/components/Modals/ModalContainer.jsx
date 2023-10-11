import React, { Fragment, useEffect } from 'react'
import Overlay from '../UI/Overlay/Overlay'

const ModalContainer = ({ trigger, children }) => {
    useEffect(() => {
        trigger ? document.body.style = 'overflow: hidden' : document.body.style = 'overflow: auto'

        return () => document.body.style = 'overflow: auto'
    }, [trigger])

    return (
        <Overlay>
            {children}
        </Overlay>
    )
}

export default ModalContainer