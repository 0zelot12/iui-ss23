function Popover({ children, active }) {
  return active ? (
    <div className="p-8 bg-blue-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-2xl">
      <div className="space-y-2">{children}</div>
    </div>
  ) : null;
}

export { Popover };
