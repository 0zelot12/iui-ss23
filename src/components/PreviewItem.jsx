function PreviewItem({ item, onClick }) {
  return (
    <li
      className="py-2 px-4 bg-blue-200 rounded-lg shadow text-blue-950 cursor-pointer"
      onClick={() => {
        onClick(item);
      }}
    >
      {item.label}
    </li>
  );
}

export { PreviewItem };
