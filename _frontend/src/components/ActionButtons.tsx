import { deleteIcon, editIcon } from "../assets/svg";

type ActionType = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionButtons = ({ onEdit, onDelete }: ActionType) => {
  return (
    <div className="action-buttons flex gap-3">
      <span onClick={onEdit}>{editIcon}</span>
      <span onClick={onDelete}>{deleteIcon}</span>
    </div>
  );
};

export default ActionButtons;
