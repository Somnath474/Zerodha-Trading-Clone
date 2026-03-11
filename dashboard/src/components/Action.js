const { openSellWindow } = useContext(GeneralContext);

<button
  className="btn btn-red"
  onClick={() => openSellWindow(uid)}
>
  Sell
</button>