import { deleteIcon, editIcon } from "../assets/svg";

const ActionButtons = () => {
  return (
    <div className="action-buttons flex gap-3">
      <span>{editIcon}</span>
      <span>{deleteIcon}</span>
    </div>
  );
};

export default ActionButtons;
