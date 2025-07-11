import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [isSending, setIsSending] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sendResult, setSendResult] = useState(null); // { success: boolean, message: string }

    // Initialize EmailJS (optional; you can also pass public key directly in send)
    useEffect(() => {
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        if (publicKey) {
            emailjs.init(publicKey);
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation: ensure required fields are filled
        if (
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message
        ) {
            setSendResult({
                success: false,
                message: "Please fill in all required fields.",
            });
            return;
        }

        setIsSending(true);
        setSendResult(null);

        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        // Prepare template parameters matching your EmailJS template variables
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            // Optionally add page URL or timestamp:
            page_url: window.location.href,
            // current_year: new Date().getFullYear(), // if your template uses it
        };

        try {
            // Use emailjs.send (since we have data in state) instead of sendForm
            const response = await emailjs.send(
                serviceID,
                templateID,
                templateParams,
                publicKey
            );
            console.log("EmailJS success:", response.status, response.text);
            setSendResult({
                success: true,
                message: "Message sent successfully!",
            });
            setIsSubmitted(true);
            // Reset form fields
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
            // Optionally hide “Message Sent!” after a timeout
            setTimeout(() => {
                setIsSubmitted(false);
                setSendResult(null);
            }, 5000);
        } catch (error) {
            console.error("EmailJS error:", error);
            setSendResult({
                success: false,
                message: "Failed to send message. Please try again later.",
            });
        } finally {
            setIsSending(false);
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Address",
            details: [
                "HIG II, Plot 5-12, Jamunipur Colony",
                "BHADOHI-221401, U.P. INDIA",
            ],
        },
        {
            icon: Phone,
            title: "Sales Contact",
            details: [
                "Mr. Sandeep Jaiswal: +91-9335723032",
                "Mr. Suryansh Jaiswal: +91-7007596907",
                "Head Office Contact: Ms. Varnika Jaiswal: +91-9918022212",
            ],
        },
        {
            icon: Mail,
            title: "Email",
            details: ["carpetshimalaya@gmail.com"],
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: [
                "Monday - Friday: 9AM - 7PM",
                "Saturday: 10AM - 6PM",
                "Sunday: Closed",
            ],
        },
    ];

    return (
        <div className="bg-white">
            {/* Simple Header */}
            <section className="bg-[rgb(83,62,45)] py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                        Contact Us
                    </h1>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 p-4"
                            >
                                <div className="flex items-center mb-3">
                                    <info.icon className="w-5 h-5 text-[rgb(83,62,45)] mr-2" />
                                    <h3 className="font-bold text-[rgb(83,62,45)]">
                                        {info.title}
                                    </h3>
                                </div>
                                <div>
                                    {info.details.map((detail, idx) => (
                                        <p
                                            key={idx}
                                            className="text-foreground text-sm mb-1"
                                        >
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                            Send us a Message
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 border border-gray-200"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Subject *
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                    >
                                        <option value="">
                                            Select a subject
                                        </option>
                                        <option value="General Inquiry">
                                            General Inquiry
                                        </option>
                                        <option value="Customer Support">
                                            Customer Support
                                        </option>
                                        <option value="Business Partnership">
                                            Business Partnership
                                        </option>
                                        <option value="Feedback">
                                            Feedback
                                        </option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 text-foreground"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>

                            {sendResult && (
                                <p
                                    className={`mb-4 text-sm ${
                                        sendResult.success
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {sendResult.message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSending || isSubmitted}
                                className="w-full bg-[rgb(83,62,45)] text-white py-2 px-4 font-medium disabled:bg-gray-400 transition"
                            >
                                {isSending
                                    ? "Sending..."
                                    : isSubmitted
                                    ? "Message Sent!"
                                    : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                        Find Us
                    </h2>
                    <div className="max-w-4xl mx-auto h-84 bg-gray-200 flex items-center justify-center">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.6006584085976!2d82.59422917438361!3d25.384697024082673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fde78ffef9bd1%3A0x330b0009b0b2fc26!2sHimalaya%20Concepts!5e0!3m2!1sen!2sin!4v1750658104862!5m2!1sen!2sin"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-8 md:py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[rgb(83,62,45)] mb-6 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                question: "What are your shipping options?",
                                answer: "We offer standard shipping (7-10 days) and express shipping (3-5 days) across India. International shipping is available to select countries.",
                            },
                            {
                                question: "Do you offer custom carpet orders?",
                                answer: "Yes, we specialize in custom orders. Contact our design team to discuss your requirements and get a personalized quote.",
                            },
                            {
                                question: "What is your return policy?",
                                answer: "We offer a 7-day return policy for unused items in original condition. Custom orders are non-returnable unless there's a manufacturing defect.",
                            },
                            {
                                question: "How can I track my order?",
                                answer: "Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account dashboard.",
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 border border-gray-200"
                            >
                                <h3 className="font-bold text-[rgb(83,62,45)] mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-foreground">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className="py-8 md:py-12 bg-[rgb(83,62,45)]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Connect With Us
                    </h2>
                    <p className="text-white mb-6">
                        Follow us on social media for updates and exclusive
                        offers
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="bg-white p-2">
                            <span className="sr-only">Facebook</span>
                            {/* Facebook SVG */}
                            <svg
                                className="w-6 h-6 text-[rgb(83,62,45)]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/himalaya.carpets/"
                            className="bg-white p-2"
                        >
                            <span className="sr-only">Instagram</span>
                            {/* Instagram SVG */}
                            <svg
                                className="w-6 h-6 text-[rgb(83,62,45)]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        <a href="#" className="bg-white p-2">
                            <span className="sr-only">Twitter</span>
                            {/* Twitter SVG */}
                            <svg
                                className="w-6 h-6 text-[rgb(83,62,45)]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
