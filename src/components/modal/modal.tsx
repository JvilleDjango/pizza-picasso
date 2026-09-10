import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './modal.module.scss'

interface ModalProps {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
}

const Modal = ({ open, onClose, onConfirm }: ModalProps) => {
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose()
      }}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="confirm-dialog-overlay" />
        <AlertDialog.Content className="confirm-dialog-content">
          <AlertDialog.Title className="confirm-dialog-title">
            Are you sure you want to delete?
          </AlertDialog.Title>
          <AlertDialog.Description className="confirm-dialog-description">
            This action removes the current item from your working list.
          </AlertDialog.Description>
          <div className="confirm-dialog-actions">
            <AlertDialog.Cancel asChild>
              <button type="button" className="confirm-dialog-button">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                type="button"
                className="confirm-dialog-button confirm-dialog-button-danger"
                onClick={() => {
                  onConfirm?.()
                  onClose()
                }}
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default Modal
