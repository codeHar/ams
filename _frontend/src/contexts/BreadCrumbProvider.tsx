import { ReactNode, createContext, useState } from "react";

interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  setBreadCrumbItem: React.Dispatch<React.SetStateAction<BreadcrumbItem[]>>;
}

export const BreadcrumbContext = createContext<BreadcrumbContextType>({
  items: [],
  setBreadCrumbItem: () => {},
});

interface BreadcrumbItem {
  text: string;
  link?: string;
}

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [items, setBreadCrumbItem] = useState<BreadcrumbItem[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ items, setBreadCrumbItem }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
