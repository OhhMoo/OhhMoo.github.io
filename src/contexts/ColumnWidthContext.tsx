"use client";

import { createContext, useContext, useState } from "react";

export const COLUMN_MIN = 300;
export const COLUMN_MAX = 880;

type ColumnWidthContextType = {
  columnWidth: number;
  setColumnWidth: (w: number) => void;
};

const ColumnWidthContext = createContext<ColumnWidthContextType>({
  columnWidth: 580,
  setColumnWidth: () => {},
});

export function ColumnWidthProvider({ children }: { children: React.ReactNode }) {
  const [columnWidth, setColumnWidth] = useState(580);
  return (
    <ColumnWidthContext.Provider value={{ columnWidth, setColumnWidth }}>
      {children}
    </ColumnWidthContext.Provider>
  );
}

export function useColumnWidth() {
  return useContext(ColumnWidthContext);
}
