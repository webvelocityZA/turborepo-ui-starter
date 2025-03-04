import { motion } from "framer-motion";

export const DemoHeader = () => {
  return (
    <div className="relative w-full overflow-hidden bg-background py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mx-4">
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4"
              style={{
                WebkitTextStroke: "1px rgb(0 0 0)",
              }}
            >
              {"//DEMO//DEMO//DEMO//DEMO//DEMO//DEMO//DEMO//DEMO"}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
