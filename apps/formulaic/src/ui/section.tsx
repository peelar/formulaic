export const Section = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <section className="my-12 max-w-5xl w-full mx-auto">
      {title && <h3 className="text-2xl font-bold">{title}</h3>}
      {children}
    </section>
  );
};
