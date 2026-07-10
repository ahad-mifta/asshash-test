import { useState } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";

// The account-deletion endpoint lives on the MAIN asshash backend (api.asshash.app),
// not this app's backend. Override via VITE_MAIN_API_URL if needed.
const MAIN_API_URL =
  import.meta.env.VITE_MAIN_API_URL || "https://api.asshash.app/api";

const AccountDeletion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { type: "success" | "error", message }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setResult({ type: "error", message: "Please enter your email and password." });
      return;
    }

    const confirmed = window.confirm(
      "Are you absolutely sure?\n\nThis will PERMANENTLY delete your Asshash account and all associated data. This action cannot be undone.\n\nClick OK to proceed."
    );
    if (!confirmed) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${MAIN_API_URL}/account/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setEmail("");
        setPassword("");
        setResult({
          type: "success",
          message:
            "Your account and all associated data have been deleted successfully.",
        });
      } else {
        setResult({
          type: "error",
          message: data.message || "Failed to delete account. Please try again.",
        });
      }
    } catch (err) {
      setResult({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black">
      {/* Hero */}
      <div className="bg-[linear-gradient(135deg,#0b3d2a_0%,#14553b_48%,#1f6a49_100%)] text-white">
        <Navbar />

        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              Asshash Account Center
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight font-montHeavy">
              Account &amp; Data Deletion
            </h1>
            <p className="mt-6 max-w-3xl text-base md:text-lg text-white/80">
              Request permanent deletion of your Asshash account (Patient or
              Doctor) and all associated data. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl">
          {/* Left: What gets deleted */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0b3d2a] mb-6">
              What happens when you delete your account?
            </h2>
            <p className="text-black/70 mb-6 leading-relaxed">
              Enter your account email and password below to permanently remove
              your Asshash account and the data linked to it.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#0b3d2a] mb-2">
                  Data that will be deleted
                </h3>
                <ul className="list-disc list-inside space-y-1 text-black/70 text-sm">
                  <li>Profile information (name, email, phone, photo)</li>
                  <li>Appointments and consultation history</li>
                  <li>Prescriptions and test recommendations</li>
                  <li>Chat conversations and messages</li>
                  <li>Saved favorites and emergency contacts</li>
                  <li>Notifications and health cards</li>
                  <li>Reviews and wallet transactions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#0b3d2a] mb-2">
                  Data that may be retained
                </h3>
                <ul className="list-disc list-inside space-y-1 text-black/70 text-sm">
                  <li>
                    Payment records — retained for legal and financial
                    compliance
                  </li>
                  <li>
                    Audit logs — retained where required by law
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-[#0b3d2a] mb-1">
                Delete your account
              </h2>
              <p className="text-black/60 text-sm mb-6">
                This works for both the Patient and Doctor apps.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#22B573] focus:ring-2 focus:ring-[#22B573]/20"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-[#22B573] focus:ring-2 focus:ring-[#22B573]/20"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Deleting account…" : "Delete My Account"}
              </button>

              {result && (
                <div
                  className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                    result.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {result.message}
                </div>
              )}

              <p className="mt-4 text-xs text-black/50 text-center">
                By clicking delete, you confirm you want to permanently erase
                your account. This cannot be undone.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer color="bg-[#123126]" />
    </div>
  );
};

export default AccountDeletion;
