import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Sparkles, ShieldCheck, Paintbrush } from 'lucide-react';
import MobileRigSection from '@/components/MobileRigSection';
import { Button } from '@/components/ui/button'; // <--- Added this import!

const HomePage = () => {
  const services = [
    {
      icon: Car,
      title: 'Exterior Detailing',
      description: 'Restore your vehicle\'s shine with our comprehensive wash, wax, and paint correction services.'
    },
    {
      icon: Sparkles,
      title: 'Interior Detailing',
      description: 'Deep clean and sanitize your car\'s interior, leaving it fresh and spotless.'
    },
    {
      icon: ShieldCheck,
      title: 'Ceramic Coatings',
      description: 'Provide long-lasting protection and an unparalleled gloss to your vehicle\'s paint.'
    },
    {
      icon: Paintbrush,
      title: 'Paint Correction',
      description: 'Remove swirls, scratches, and imperfections to achieve a flawless finish.'
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Home - Riotous Car Care</title>
        <meta name="description" content="Welcome to Riotous Car Care - Your premier destination for professional auto detailing and ceramic coating services. Experience the ultimate shine and protection." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583850550570-5b6826437d36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-90"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl px-4"
          >
            <h1 className="text-6xl font-extrabold leading-tight mb-6 text-primary drop-shadow-lg">
              Experience Automotive Perfection
            </h1>
            <p className="text-2xl font-light mb-8 drop-shadow-md">
              Unleash your vehicle's true potential with our premium detailing and ceramic coating services.
            </p>
            <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-gray-900 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-primary/90 transition duration-300"
              >
                Book Your Transformation
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-12">Our Signature Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-800"
              >
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-6">
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: services.length * 0.1 }}
            className="mt-16"
          >
            <Link to="/services">
              <Button size="lg" className="bg-primary text-gray-900 hover:bg-primary/90">
                View All Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <MobileRigSection />

      {/* Testimonials or CTA Section (Example) */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary">Ready for a Flawless Finish?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the hundreds of satisfied clients who trust us with their vehicles.
          </p>
          <Link to="/booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-gray-900 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-secondary/90 transition duration-300"
            >
              Get a Quote Today
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;