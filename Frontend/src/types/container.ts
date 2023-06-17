export interface Container {
  children: React.ReactNode;
  props?: any;
  onClick?: () => void;
}

export interface InputContainer {
  props?: any;
  type?: string;
  placeholder?: string;
  register?: any;
}
