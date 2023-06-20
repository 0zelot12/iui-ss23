function PreviewItem({ item }) {
  return (
    <li
      key={item.id}
      className="p-2 border-2 border-blue-500 rounded text-blue-950"
    >
      {item.label}
    </li>
  );
}

export { PreviewItem };
