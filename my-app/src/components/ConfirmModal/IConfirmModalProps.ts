export interface IConfirmModalProps {
  name?: string;
  id?: string;
  text: string;
  onYes: () => void;
  onNo: () => void;
}
