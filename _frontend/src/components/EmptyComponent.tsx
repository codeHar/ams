const EmptyComponent = ({ msg }: { msg?: string }) => {
  return (
    <div className="empty-container w-full h-full flex flex-col justify-center items-center">
      <p>{msg ? msg : "Currently, there is no data."}</p>
    </div>
  );
};

export default EmptyComponent;
