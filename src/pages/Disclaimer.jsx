import React from "react";

export default function Disclaimer() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Disclaimer
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
        <strong>Effective Date:</strong> 07/8/2025
      </p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <p>
            The information provided on{" "}
            <strong>Tech Gears Finds4You</strong>{" "}
            (<a
              href="https://techgearsfinds4you.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              https://techgearsfinds4you.vercel.app
            </a>) is for general informational and educational purposes only.
            While we strive for accuracy, we make no guarantees about the
            completeness, reliability, or accuracy of this information.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            📌 Amazon Affiliate Disclosure
          </h2>
          <p>
            <strong>Tech Gears Finds4You</strong> participates in the{" "}
            <strong>Amazon Services LLC Associates Program</strong>, an
            affiliate advertising program designed to provide a means for sites
            to earn advertising fees by linking to{" "}
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="nofollow noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              Amazon.com
            </a>{" "}
            and other Amazon regional sites (UK, Canada, etc.).
          </p>
          <p>
            As an Amazon Associate, we may earn a commission from qualifying
            purchases. These commissions help support our blog at no additional
            cost to you.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            📌 External Links Disclaimer
          </h2>
          <p>
            Our website may contain links to external sites. We are not
            responsible for the accuracy, relevance, or content of these
            external websites.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Product Information</h2>
          <p>
            Product details, prices, and availability shown on this blog may
            change at any time. Please always check the official Amazon product
            page for the latest information.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            📌 Limitation of Liability
          </h2>
          <p>
            We will not be liable for any losses, injuries, or damages from the
            display or use of information provided on this site. Users should
            verify product suitability before making a purchase.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Contact Us</h2>
          <p>
            If you have any questions about this disclaimer, please contact us
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
