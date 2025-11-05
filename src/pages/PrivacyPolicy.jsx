import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Privacy Policy
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
        <strong>Effective Date:</strong> 07/8/2025
      </p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <p>
            At <strong>Tech Gears Finds4You</strong>{" "}
            (<a
              href="https://techgearsfinds4you.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              https://techgearsfinds4you.vercel.app
            </a>), we value your privacy. This Privacy Policy explains how we
            collect, use, and protect your information when you visit our
            website.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Information We Collect</h2>
          <p>We may collect:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Basic usage data such as pages visited and time spent on the blog
              (via Google Analytics or Blogger stats)
            </li>
            <li>
              Information you voluntarily provide via contact forms (name, email,
              etc.)
            </li>
          </ul>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            📌 How We Use Your Information
          </h2>
          <p>We may use your information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Improve the content and performance of our blog</li>
            <li>Respond to inquiries or feedback</li>
            <li>Track affiliate performance (through Amazon)</li>
          </ul>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Affiliate Disclosure</h2>
          <p>
            We participate in the{" "}
            <strong>Amazon Services LLC Associates Program</strong>, which allows
            us to earn a commission by linking to Amazon.com and related sites.
            These links <strong>do not cost you anything extra</strong>, but help
            support the blog.
          </p>
          <p>Amazon may use cookies to track your visit and handle affiliate referrals.</p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Cookies</h2>
          <p>
            This website may use cookies to analyze traffic and provide a better
            user experience. You can disable cookies in your browser settings if
            you prefer.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Third-Party Links</h2>
          <p>
            Our website may contain links to external websites, especially
            Amazon. We are not responsible for the privacy practices of those
            sites.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Your Consent</h2>
          <p>By using this site, you consent to our privacy policy.</p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Contact Us</h2>
          <p>
            If you have any questions about this policy, feel free to contact us
            at:
          </p>
          <p>
            📧{" "}
            <a
              href="mailto:sayedmoselhi99@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              sayedmoselhi99@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
