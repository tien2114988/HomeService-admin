import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { decrement, increment } from "@/app/modules/counter/counterSlice";
import React from "react";

const MapWithMarker: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default MapWithMarker;
