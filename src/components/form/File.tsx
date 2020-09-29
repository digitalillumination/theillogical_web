import React, { useRef } from "react";
import { Button, Popover } from "@material-ui/core";

interface FileComponentInterface {
  accept?: string;
}
interface FileFormOptions {
  open?: boolean
  onClose?(): any
  anchorEl?: any
}
function FileComponent({accept, innerRef}: FileComponentInterface & {innerRef: React.MutableRefObject<HTMLInputElement | null>}) {
  return (
    <input type="file" accept={accept} ref={innerRef} />
  )
}

function useCreateFileForm(
    type: 'popover' | 'plain',
    submitCallback: (el: HTMLInputElement) => any,
    {anchorEl, open = false, onClose = () => {}, ...props}: FileComponentInterface & FileFormOptions = {}
  ) {
  const ref = useRef<HTMLInputElement | null>(null);
  const fileElement = <FileComponent {...props} innerRef={ref} />
  const formElement = (
    <form onSubmit={e => {e.preventDefault(); onSubmit();}}>
      {fileElement}
      <Button type="submit" color="secondary" variant="contained">
        업로드
      </Button>
    </form>
  );

  function onSubmit() {
    if (!ref.current) return;
    submitCallback(ref.current);
  }

  return type === 'plain' ? formElement : (
    <Popover anchorEl={anchorEl} open={open} onClose={onClose}>
      {formElement}
    </Popover>
  );
}

export default useCreateFileForm;