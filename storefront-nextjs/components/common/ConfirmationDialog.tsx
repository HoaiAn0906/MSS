import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";

type DialogProps = {
  isOpen?: boolean;
  title?: string;
  children: React.ReactNode;
  isShowOk?: boolean;
  isShowCancel?: boolean;
  okText?: string;
  cancelText?: string;
  ok: (data?: unknown) => void;
  cancel: () => void;
};

export default function ConfirmationDialog(props: DialogProps) {
  const {
    isOpen,
    title,
    children,
    okText,
    cancelText,
    isShowOk = true,
    isShowCancel = true,
    ok,
    cancel,
  } = props;

  const handleOk = (): void => {
    ok();
  };

  const handleCancel = (): void => {
    cancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={cancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{children}</DialogDescription>
        <DialogFooter>
          {isShowCancel && (
            <Button variant="secondary" onClick={handleCancel}>
              {cancelText}
            </Button>
          )}
          {isShowOk && (
            <Button variant="default" onClick={handleOk}>
              {okText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
