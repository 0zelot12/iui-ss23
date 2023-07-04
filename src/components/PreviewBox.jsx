import { PreviewItem } from "./PreviewItem";

function PreviewBox({ items, onItemClick }) {
  return items.length === 0 ? null : (
    <ol className="border-2 border-blue-500 flex flex-wrap p-2 justify-start space-x-2 rounded gap-y-2">
      {items.map((item) => (
        <PreviewItem item={item} onClick={onItemClick} />
      ))}
    </ol>
  );
}

export { PreviewBox };
