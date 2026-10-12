/**
 * Port of PageComponent (simple text page wrapper)
 */
export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="dv-page">
      <div className="content">{children}</div>
    </div>
  );
}
