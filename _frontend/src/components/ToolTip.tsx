import { ReactNode } from "react";

const Tooltip = ({ text, children }: { text: string; children: ReactNode }) => {
  return (
    <div className="tooltip-container">
      <div className="tooltip-content">
        {children}
        <span className="tooltip-text">{text}</span>
      </div>
    </div>
  );
};

export default Tooltip;
