import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#FAF8F5]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-6"
      >
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#1A1A1A]/30 mb-4">
          404
        </p>
        <h1
          className="text-5xl font-bold text-[#1A1A1A] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Page Not Found
        </h1>
        <p className="text-[#1A1A1A]/55 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3.5 text-sm font-semibold bg-[#1A1A1A] text-white rounded-sm hover:bg-[#333] transition-all duration-200"
        >
          Back to Home
        </a>
      </motion.div>
    </div>
  );
}
