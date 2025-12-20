import Navbar from "./Navbar";
import Threads from "./Threads";

export default function Layout({ children }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#000000",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          opacity: 0.6,
        }}
      >
        <Threads
          color={[1, 1, 1]}
          amplitude={1}
          distance={0.3}
          enableMouseInteraction={true}
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main
        style={{
          position: "relative",
          zIndex: 5,
        }}
      >
        {children}
      </main>
    </div>
  );
}

