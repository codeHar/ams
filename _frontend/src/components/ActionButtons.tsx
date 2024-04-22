import { deleteIcon, editIcon, eyeIcon } from "../assets/svg";
import Tooltip from "./ToolTip";

type ActionType = {
  onEdit: () => void;
  onDelete: () => void;
  canViewMusic?: boolean;
  onViewMusic?: () => void;
};

const ActionButtons = ({
  onEdit,
  onDelete,
  canViewMusic = false,
  onViewMusic,
}: ActionType) => {
  return (
    <div className="action-buttons flex gap-3">
      {canViewMusic && (
        <Tooltip text="View Music">
          <span onClick={onViewMusic}>{eyeIcon}</span>
        </Tooltip>
      )}
      <Tooltip text="Edit">
        <span onClick={onEdit}>{editIcon}</span>
      </Tooltip>
      <Tooltip text="Delete">
        <span onClick={onDelete}>{deleteIcon}</span>
      </Tooltip>
    </div>
  );
};

export default ActionButtons;
