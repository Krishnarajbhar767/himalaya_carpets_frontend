import { motion } from "framer-motion";
import Logo from "/Office_Logo.png";
import { Link } from "react-router-dom";
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutUs = () => {
    const stats = [
        { number: "5000+", label: "Tufted Rugs Monthly" },
        { number: "5000+", label: "Handloom Rugs Monthly" },
        { number: "2000+", label: "Knotted Rugs Monthly" },
        { number: "25+", label: "Years of Craftsmanship" },
    ];

    const team = [
        { name: "Sandeep Jaiswal", role: "Sales Contact" },
        { name: "Suryansh Jaiswal", role: "Sales Contact" },
        { name: "Varnika Jaiswal", role: "Head Office Contact" },
    ];

    return (
        <div className="bg-white text-gray-800">
            {/* Header */}
            <section className="bg-[rgb(83,62,45)] py-16">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white"
                    >
                        About Us
                    </motion.h1>
                </div>
            </section>

            {/* Story */}
            <section className="py-16">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="order-2 md:order-1"
                    >
                        <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                            Our Story
                        </h2>
                        <p className="mb-4">
                            Himalaya Carpets is an Indian government-recognized
                            export house engaged in manufacturing and exporting
                            all types of handmade carpets. We are rooted in
                            traditional craftsmanship and dedicated to offering
                            products that match modern home décor trends.
                        </p>
                        <p>
                            Our in-house R&D team and designers work closely
                            with clients to deliver customized, high-quality
                            carpets at reasonable prices—ensuring lasting
                            satisfaction.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="order-1 md:order-2"
                    >
                        <img
                            src={Logo}
                            alt="Himalaya Carpets"
                            className="w-full rounded shadow-lg"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                            Our Mission
                        </h2>
                        <p>
                            To manufacture and export high-quality handmade
                            carpets by blending traditional craftsmanship with
                            modern innovation, ensuring customer satisfaction
                            through stringent quality control and personalized
                            service.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-[rgb(83,62,45)] mb-4">
                            Our Vision
                        </h2>
                        <p>
                            To be a globally recognized leader in handmade
                            carpet craftsmanship, known for innovation,
                            excellence, and sustainable practices.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-[rgb(83,62,45)] mb-10"
                    >
                        Our Core Values
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            "Quality Craftsmanship",
                            "Customer Satisfaction",
                            "Innovation",
                            "Sustainability",
                        ].map((title, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white shadow border p-6 rounded-lg"
                            >
                                <h3 className="text-xl font-semibold text-[rgb(83,62,45)] mb-2">
                                    {title}
                                </h3>
                                <p>
                                    {title === "Quality Craftsmanship"
                                        ? "We deliver only the finest hand-woven carpets using traditional methods."
                                        : title === "Customer Satisfaction"
                                        ? "Our top priority is our clients' trust and long-term relationships."
                                        : title === "Innovation"
                                        ? "Constant evolution in design and production."
                                        : "Eco-conscious practices guide our production."}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.h2
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-[rgb(83,62,45)] mb-10 text-center"
                    >
                        Meet the Team
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <img
                                    src={`https://source.unsplash.com/200x200/?person,${
                                        i + 10
                                    }`}
                                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                                    alt={member.name}
                                />
                                <h3 className="font-bold text-[rgb(83,62,45)]">
                                    {member.name}
                                </h3>
                                <p>{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <p className="text-4xl font-bold text-[rgb(83,62,45)]">
                                    {stat.number}
                                </p>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-[rgb(83,62,45)] text-white text-center">
                <div className="container mx-auto px-4">
                    <motion.h2
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-4"
                    >
                        Join Our Journey
                    </motion.h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                        Be part of our mission to deliver high-quality handmade
                        carpets and support traditional craftsmanship across the
                        globe.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link
                            to="/products/all/685a6381e6c33dcf91fa54d0"
                            className="bg-white text-[rgb(83,62,45)] px-6 py-2 font-medium rounded"
                        >
                            Explore Products
                        </Link>
                        <Link
                            to="/contact"
                            className="border border-white px-6 py-2 font-medium rounded"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
