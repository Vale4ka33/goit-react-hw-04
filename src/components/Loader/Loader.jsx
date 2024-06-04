import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="spinner-container">
      <DNA
        visible={true}
        height="60"
        width="60"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
