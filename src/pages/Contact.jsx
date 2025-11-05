import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent (demo mode).");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Contact Us
      </h1>

      <p className="text-lg mb-6 text-center">
        We’d love to hear from you! Whether you have questions, suggestions, or
        feedback about{" "}
        <strong className="text-blue-600 dark:text-blue-400">
          Tech Gears Finds4You
        </strong>
        , feel free to reach out.
      </p>

      <hr className="border-gray-300 dark:border-gray-700 my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">📧 Email</h2>
        <p>
          You can contact us directly at:{" "}
          <a
            href="mailto:sayedmoselhi99@gmail.com"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            sayedmoselhi99@gmail.com
          </a>
        </p>
      </section>

      <hr className="border-gray-300 dark:border-gray-700 my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">📨 Contact Form</h2>
        <p>You can also use the form below to send us a message:</p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
          >
            Send Message
          </button>
        </form>
      </section>

      <hr className="border-gray-300 dark:border-gray-700 my-8" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">📌 Social Media</h2>
        <p>Follow us for updates and new posts:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <a href="#" className="text-blue-600 dark:text-blue-400 underline">
              Facebook
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 dark:text-blue-400 underline">
              Twitter (X)
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 dark:text-blue-400 underline">
              Pinterest
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
