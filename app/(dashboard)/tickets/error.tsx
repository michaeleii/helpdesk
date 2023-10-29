"use client";
export default function error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="text-center">
      <h2 className="text-4xl">Oh No!</h2>
      <p className="text-xl">{error.message}</p>
      <button className="btn-primary mx-auto my-4" onClick={reset}>
        Try Again
      </button>
    </main>
  );
}
