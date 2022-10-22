import HashLoader from "react-spinners/HashLoader";

const BackdropCustomize = (): JSX.Element => {
  return (
    <div
      className="inset-0 flex fixed items-center justify-center bg-black-05"
      style={{
        zIndex: 10001,
      }}
    >
      <HashLoader color="#57B8FF" loading={true} size={50} />
    </div>
  );
};
export default BackdropCustomize;
