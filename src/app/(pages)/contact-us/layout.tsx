import { ReactNode } from "react";

const BookAppointment = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <head>
        <title>
          {`Contact Us | ${process.env.NEXT_PUBLIC_WEBSITE_NAME_FOR_TITLE}`}
        </title>
      </head>
      {children}
    </div>
  );
};
export default BookAppointment;
