import React, { useState } from "react";

import { Button } from "@workspace/ui/components/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <h1 className="text-4xl font-medium">Turborepo + Vite + React + TS + Shadcn/ui + Tailwind CSS v4</h1>
      <Button onClick={() => setCount((count) => count + 1)} type="button">
        count is {count}
      </Button>
    </div>
  );
}

export default App;
