import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">There was a problem.</h2>
      <p>We could not find the ticket you were looking for.</p>
      <div className="flex justify-center mt-10">
        <button className="btn-primary">
          <Link href="/tickets">Back to all tickets</Link>
        </button>
      </div>
    </main>
  );
}
export default NotFound;
