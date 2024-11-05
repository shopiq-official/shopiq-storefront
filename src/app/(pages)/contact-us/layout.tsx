import Head from "next/head";

const BookAppointment = ({ children }: any) => {
  return (
    <div>
      <head>
        <title>Contact Us | ENTER_WEBSITE_NAME</title>
      </head>
      {children}
    </div>
  );
};
export default BookAppointment;
