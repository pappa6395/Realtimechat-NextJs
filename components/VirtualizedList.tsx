"use client"

import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

const ITEM_COUNT = 100000;
const ITEM_HEIGHT = 50;

const items = Array.from({ length: ITEM_COUNT }, (_, index) => `Item ${index + 1}`);

const Row = ({ index, style }: ListChildComponentProps) => {
  return (
    <div style={{ ...style, padding: "10px", borderBottom: "1px solid #ddd" }}>
      {items[index]}
    </div>
  );
};

// Virtualized List Component
const VirtualizedList: React.FC = () => {
  return (
    <div style={{ width: "500px", height: "880px", border: "1px solid #ddd" }}>
      <List
        height={1000} // Viewport height
        itemCount={ITEM_COUNT} // Total items
        itemSize={ITEM_HEIGHT} // Row height
        width="100%" // List width
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedList;