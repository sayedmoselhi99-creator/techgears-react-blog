import React from "react";

export default function TermsConditions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Terms & Conditions
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center">
        <strong>Effective Date:</strong> 07/8/2025
      </p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <p>
            Welcome to <strong>Tech Gears Finds4You</strong>{" "}
            (<a
              href="https://techgearsfinds4you.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              https://techgearsfinds4you.vercel.app
            </a>). By accessing or using our blog, you agree to comply with these
            Terms & Conditions. Please read them carefully.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Use of Content</h2>
          <p>
            All content published on this blog, including articles, images, and
            resources, is for informational and educational purposes only. You
            may not copy, reproduce, or redistribute any content without
            permission.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Affiliate Disclaimer</h2>
          <p>
            Our blog contains affiliate links (mainly Amazon). If you purchase
            through these links, we may earn a small commission at no extra cost
            to you.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Limitation of Liability</h2>
          <p>
            We are not responsible for any damages, losses, or issues that may
            arise from the use of products or services recommended on this blog.
            Users are advised to research products before purchasing.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 External Links</h2>
          <p>
            This website may include links to third-party websites. We are not
            responsible for the content, accuracy, or policies of external
            sites.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Changes will be
            posted on this page with the updated effective date.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Governing Law</h2>
          <p>
            These Terms & Conditions are governed by the laws of your country of
            residence and applicable international regulations.
          </p>
        </section>

        <hr className="border-gray-300 dark:border-gray-700" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">📌 Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
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
