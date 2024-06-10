import Modal from "./Modal";

function Insufficient() {
  return (
    <Modal
      title="insufficient"
      body={
        <>
          <p className="insufficient-over1">Insufficient Coins</p>
        </>
      }
    />
  );
}

export default Insufficient;
