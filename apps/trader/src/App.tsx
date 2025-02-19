import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)} type="button">
        count is {count}
      </button>
    </>
  );
}

export default App;
