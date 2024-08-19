import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { todoSlice } from "./saga/store"; // Make sure this path is correct

function App() {
  // Access Redux state
  const { data, loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoSlice.actions.fetchDataRequest());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <h6>Loading...</h6>
      ) : error ? (
        <h6>Error: {error}</h6>
      ) : (
        data.map((item) => (
          <h6 key={item.id}>{JSON.stringify(item)}</h6>
        ))
      )}
    </>
  );
}

export default App;
