'use client'

import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { sharingInformationService } from '@/utils/rxjs/SharingInformation.service'

interface ErrorDialogProps {
  title: string
  content: string
  boldContent: string
  textButton: string
}
export default function ErrorDialog(props: ErrorDialogProps) {
  const [open, setOpen] = useState(false)
  const subscription$ = sharingInformationService.getSubject()

  const handleClose = () => {
    setOpen(false)
    sharingInformationService.setSubject(false)
  }

  useEffect(() => {
    subscription$.subscribe((data) => {
      if (data) {
        setOpen(true)
      }
    })
  })

  return (
    <div>
      <Dialog
        PaperProps={{ sx: { borderRadius: '30px' } }}
        className="text-figtree "
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="text-center font-figtree" id="responsive-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-center font-figtree">
            {props.boldContent.length > 0 ? (
              <>
                {props.content} <span style={{ fontWeight: 'bold' }}>{props.boldContent}</span>
              </>
            ) : (
              props.content
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="justify-center">
          <Button
            className="h-[2.8rem] drop-shadow-md w-3/4 rounded-[30px] text-white bg-purple-600 hover:bg-purple-400 focus:bg-purple-400 font-figtree font-medium text-sm"
            color="inherit"
            onClick={handleClose}
          >
            {props.textButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
