import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";

const patientPolicySections = [
  {
    title: "1. Information We Collect",
    items: [
      "Full name",
      "Phone number",
      "Email address",
      "Date of birth",
      "Gender",
      "Profile photo (optional)",
      "Symptoms and health concerns",
      "Consultation history",
      "Prescriptions",
      "Uploaded medical reports or documents",
      "Doctor recommendations and notes",
      "Device model and operating system",
      "IP address",
      "App version",
      "Crash reports and diagnostics",
      "Usage analytics",
      "Approximate location information, with permission",
    ],
  },
  {
    title: "2. How We Use Your Information",
    items: [
      "Create and manage your account",
      "Connect you with healthcare professionals",
      "Schedule and manage appointments",
      "Enable chat, call, and consultation features",
      "Store prescriptions and medical records",
      "Improve app performance and user experience",
      "Provide customer support",
      "Send service notifications and reminders",
      "Prevent fraud and maintain platform security",
    ],
  },
  {
    title: "3. Sharing of Information",
    items: [
      "With doctors involved in your consultation",
      "With payment service providers",
      "With cloud hosting and analytics providers",
      "If required by law or legal process",
      "During business mergers or acquisitions",
    ],
  },
  {
    title: "4. Data Security",
    items: [
      "Encrypted data transmission (HTTPS/SSL)",
      "Secure authentication systems",
      "Restricted access to sensitive information",
      "Server and database protection measures",
    ],
  },
  {
    title: "5. Data Retention",
    items: [
      "Provide healthcare services",
      "Maintain medical records",
      "Comply with legal obligations",
      "Resolve disputes and enforce agreements",
    ],
  },
  {
    title: "6. Your Rights",
    items: [
      "Access your personal information",
      "Correct inaccurate information",
      "Request deletion of your account",
      "Withdraw certain permissions",
      "Contact us regarding privacy concerns",
    ],
  },
  {
    title: "7. Account & Data Deletion",
    items: [
      "Use account deletion features in the app, or",
      "Contact support@asshash.app",
      "Certain information may be retained where legally required.",
    ],
  },
  {
    title: "8. Children’s Privacy",
    items: [
      "The Asshash Patient App is not intended for children under 13 years old.",
      "We do not knowingly collect personal information from children without proper consent.",
    ],
  },
  {
    title: "9. Third-Party Services",
    items: [
      "Payment gateways",
      "Cloud hosting providers",
      "Analytics platforms",
      "Notification services",
      "These services may process data according to their own privacy policies.",
    ],
  },
  {
    title: "10. Changes to This Privacy Policy",
    items: [
      "We may update this privacy policy periodically.",
      "Updated versions will be posted within the app or on our website.",
      "Continued use of the app after updates means you accept the revised policy.",
    ],
  },
  {
    title: "11. Contact Us",
    items: ["Email: support@asshash.app", "Website: www.asshash.app"],
  },
];

const doctorPolicySections = [
  {
    title: "1. Information We Collect",
    items: [
      "Full name",
      "Phone number",
      "Email address",
      "Medical license number",
      "National identification information where required",
      "Specialization and qualifications",
      "Years of experience",
      "Professional profile photo and bio",
      "Appointment and consultation records",
      "Prescriptions issued through the platform",
      "Communication history with patients",
      "Notes and medical recommendations",
      "Bank account or mobile wallet information",
      "Transaction and payout history",
      "Billing-related information",
      "Device type and operating system",
      "IP address",
      "App version",
      "Crash logs and diagnostics",
      "Usage analytics",
    ],
  },
  {
    title: "2. How We Use Your Information",
    items: [
      "Verify doctor identity and credentials",
      "Enable consultations and patient communication",
      "Process payouts and transactions",
      "Maintain consultation records",
      "Improve app performance and services",
      "Provide technical and customer support",
      "Prevent fraud, abuse, and unauthorized access",
      "Comply with legal and regulatory obligations",
    ],
  },
  {
    title: "3. Sharing of Information",
    items: [
      "With patients during consultations",
      "With payment service providers",
      "With cloud hosting and analytics providers",
      "If required by law or legal authorities",
      "During mergers, acquisitions, or business transfers",
    ],
  },
  {
    title: "4. Data Security",
    items: [
      "Encrypted communication (HTTPS/SSL)",
      "Secure authentication systems",
      "Access control for sensitive information",
      "Protected servers and databases",
    ],
  },
  {
    title: "5. Data Retention",
    items: [
      "Provide healthcare platform services",
      "Maintain medical and financial records",
      "Comply with legal obligations",
      "Resolve disputes and enforce agreements",
    ],
  },
  {
    title: "6. Your Rights",
    items: [
      "Access and review your information",
      "Update or correct professional details",
      "Request account deletion",
      "Withdraw certain permissions where applicable",
      "Contact us regarding privacy concerns",
    ],
  },
  {
    title: "7. Account & Data Deletion",
    items: [
      "You may request account deletion by contacting support@asshash.app.",
      "Some information may be retained where legally required for medical, financial, or regulatory purposes.",
    ],
  },
  {
    title: "8. Patient Data Responsibility",
    items: [
      "Doctors using the Asshash platform are responsible for maintaining patient confidentiality and complying with applicable healthcare and data protection laws.",
      "Unauthorized sharing or misuse of patient information is strictly prohibited.",
    ],
  },
  {
    title: "9. Third-Party Services",
    items: [
      "Payment gateways",
      "Cloud hosting providers",
      "Analytics platforms",
      "Notification services",
      "These providers may process information according to their own privacy policies.",
    ],
  },
  {
    title: "10. Changes to This Privacy Policy",
    items: [
      "We may update this privacy policy periodically.",
      "Updated versions will be posted within the app or on our website.",
      "Continued use of the app after updates means you accept the revised policy.",
    ],
  },
  {
    title: "11. Contact Us",
    items: ["Email: support@asshash.app", "Website: www.asshash.app"],
  },
];

const PolicySection = ({ title, items }) => {
  return (
    <section className="rounded-3xl border border-black/10 bg-white/25 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-black">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm md:text-base text-black/80 list-disc pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

const PolicyPage = ({
  appName,
  subtitle,
  title,
  intro,
  sections,
  alternateHref,
  alternateLabel,
}) => {
  return (
    <div className="bg-white text-black">
      <div className="bg-[linear-gradient(135deg,#0b3d2a_0%,#14553b_48%,#1f6a49_100%)] text-white">
        <Navbar />

        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              Asshash Privacy Center
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight font-montHeavy">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-base md:text-lg text-white/80">
              {intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
              <span className="rounded-full border border-white/20 bg-white text-[#0b3d2a] px-5 py-3">
                {appName}
              </span>
              <a
                href={alternateHref}
                className="rounded-full border border-white/20 px-5 py-3 transition hover:bg-white/10"
              >
                {alternateLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16 md:py-24 space-y-16 md:space-y-24 text-black">
        <div className="max-w-4xl mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-black/70 font-semibold">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-6">
          {sections.map((section) => (
            <PolicySection key={section.title} {...section} />
          ))}
        </div>
      </main>

      <Footer color="bg-[#123126]" />
    </div>
  );
};

const PatientPrivacyPolicy = () => {
  return (
    <PolicyPage
      appName="Patient App Privacy Policy"
      subtitle="Patient App"
      title="Privacy Policy Details – Asshash Patient App"
      intro="Effective Date: April 6, 2026. Last Updated: April 6, 2026. This policy explains how Asshash collects, uses, stores, and protects information in the Patient App."
      sections={patientPolicySections}
      alternateHref="/privacy-policy/doctor"
      alternateLabel="Doctor App Privacy Policy"
    />
  );
};

const DoctorPrivacyPolicy = () => {
  return (
    <PolicyPage
      appName="Doctor App Privacy Policy"
      subtitle="Doctor App"
      title="Privacy Policy Details – Asshash Doctor App"
      intro="Effective Date: April 6, 2026. Last Updated: April 6, 2026. This policy explains how Asshash collects, uses, stores, and protects information in the Doctor App."
      sections={doctorPolicySections}
      alternateHref="/privacy-policy/patient"
      alternateLabel="Patient App Privacy Policy"
    />
  );
};

export { PatientPrivacyPolicy, DoctorPrivacyPolicy };
export default PatientPrivacyPolicy;
