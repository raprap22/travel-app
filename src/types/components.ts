export type FormField = {
  name: string;
  label: string;
  type:
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'password'
    | 'file'
    | 'textarea'
    | 'textEditor';
  options?: { value: string | number; label: string }[];
};

export type FormProps = {
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => void;
  title?: string;
  submitLabel?: string;
  isAuthComp?: boolean;
  style?: string;
  isLoading: boolean;
  btnRegis?: boolean;
  noBg?: boolean;
  insideModal?: boolean;
};
