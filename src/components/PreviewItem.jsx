function PreviewItem({ item, onClick }) {
  return (
    <li
      className="p-2 border-2 border-blue-500 rounded text-blue-950 cursor-pointer"
      onClick={() => {
        onClick(item);
      }}
    >
      {item.label}
    </li>
  );
}

export { PreviewItem };
