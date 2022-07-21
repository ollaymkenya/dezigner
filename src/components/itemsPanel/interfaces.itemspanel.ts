export default interface ComponentInterface {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  unlocked: boolean;
  editing: boolean;
  parentId?: string;
  opened?: boolean;
  children?: string[];
}