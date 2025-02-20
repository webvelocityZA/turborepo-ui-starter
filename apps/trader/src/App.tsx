import { useState } from "react";

import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <Button onClick={() => setCount((count) => count + 1)} type="button">
        count is {count}
      </Button>
    </div>
  );
}

export default App;
