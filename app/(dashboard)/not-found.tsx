import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">There was a problem.</h2>
      <p>We could not find the page you were looking for.</p>
      <div className="flex justify-center mt-10">
        <button className="btn-primary">
          <Link href="/">Back to Dashboard</Link>
        </button>
      </div>
    </main>
  );
}
export default NotFound;
