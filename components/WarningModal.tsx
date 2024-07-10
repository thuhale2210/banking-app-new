import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const WarningModal: React.FC<WarningModalProps> = ({ open, onClose, onContinue, onSignOut }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>Inactivity Warning</DialogTitle>
          <DialogDescription>
            You have been inactive for 5 minutes. You will be logged out in 5 minutes. Do you want to continue your session?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="form-secondary-btn p-2" onClick={onSignOut}>
            Log out
          </button>
          <button className="form-btn p-2" onClick={onContinue}>
            Continue Session
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningModal;
