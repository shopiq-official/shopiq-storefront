const Collections = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <head>
        <title>{`Collections | ${process.env.NEXT_PUBLIC_WEBSITE_NAME_FOR_TITLE}`}</title>
      </head>
      {children}
    </div>
  );
};
export default Collections;
