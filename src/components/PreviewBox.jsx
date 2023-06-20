import { PreviewItem } from "./PreviewItem";

function PreviewBox({ items }) {
  return (
    <ol className="border-2 border-blue-500 flex p-2 justify-start space-x-2 rounded">
      {items.map((item) => (
        <PreviewItem item={item} />
      ))}
    </ol>
  );
}

export { PreviewBox };
