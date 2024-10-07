const CardView = () => {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Card Number"
        className="border p-2 rounded-md w-full"
      />
      <input
        type="text"
        placeholder="Expiry Date"
        className="border p-2 rounded-md w-full"
      />
      <input
        type="text"
        placeholder="CVV"
        className="border p-2 rounded-md w-full"
      />
    </div>
  );
};

export default CardView;
