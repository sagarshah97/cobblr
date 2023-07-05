import inprogress from "../../assets/images/inprogress.gif";
function UnderConstruction() {
  return (
    <>
      <div>
        <div
          style={{
            alignContent: "center",
            textAlign: "center",
            paddingTop: "100px",
          }}
        >
          <img src={inprogress} alt="img" width={"500px"} />
        </div>
      </div>
    </>
  );
}

export default UnderConstruction;
