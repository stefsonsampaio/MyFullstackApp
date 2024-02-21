import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Modal({isOpen, setModalOpen, children}) {
    if (isOpen) {
        return (
           <div className="container-modal">
                <form className="form-modal">
                    <button className="close-modal" onClick={setModalOpen}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    {children}
                </form>
            </div>
        )
    }

    return null
}

export default Modal