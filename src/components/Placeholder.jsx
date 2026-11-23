// Shows a dashed "fill me in" box while developing (npm run dev).
// In the production build (npm run build) it renders nothing, so empty sections never go live.
export default function Placeholder({ title, children }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="placeholder" role="note">
      <b>Placeholder · only visible in dev</b>
      <span>{title}</span>
      {children && <small>{children}</small>}
    </div>
  );
}
