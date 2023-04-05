interface CurrentLocationBtnType {
  mapRef: React.RefObject<HTMLDivElement>;
  getCurrentLocation: () => void;
}

function CurrentLocationBtn({
  mapRef,
  getCurrentLocation,
}: CurrentLocationBtnType) {
  return (
    <div
      ref={mapRef}
      style={{
        width: "74vw",
        height: "100vh",
      }}
    >
      <button
        style={{
          position: "fixed",
          zIndex: 100,
          bottom: "10%",
          right: "2%",
          border: "0",
          backgroundColor: "white",
          width: "2%",
          height: "4vh",
        }}
        onClick={() => getCurrentLocation()}
      >
        ➕
      </button>
    </div>
  );
}

export default CurrentLocationBtn;
