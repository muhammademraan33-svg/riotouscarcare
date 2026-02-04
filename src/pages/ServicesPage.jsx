import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Car, Sparkles, ShieldCheck, Paintbrush, Truck, Bike, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MobileRigSection from '@/components/MobileRigSection';

const servicesData = [
  {
    icon: Car,
    title: 'Exterior Detailing',
    description: 'Comprehensive wash, decontamination, clay bar treatment, paint sealant application, wheel and tire cleaning, and exterior trim restoration.',
    price: 'Starting at $149',
    details: [
      'Foam cannon pre-soak',
      'Two-bucket wash method',
      'Iron and tar removal',
      'Clay bar treatment',
      '1-year paint sealant',
      'Tire dressing & wheel cleaning',
    ],
  },
  {
    icon: Sparkles,
    title: 'Interior Detailing',
    description: 'Thorough vacuuming, steam cleaning, stain removal, leather conditioning, interior surface cleaning, and odor elimination.',
    price: 'Starting at $129',
    details: [
      'Deep vacuuming',
      'Carpet and upholstery shampoo/steam',
      'Stain extraction',
      'Leather cleaning & conditioning',
      'All interior surfaces cleaned and protected',
      'Odor removal',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Ceramic Coatings',
    description: 'Advanced ceramic coating application for paint, wheels, and glass, providing long-term protection and hydrophobic properties.',
    price: 'Starting at $599',
    details: [
      'Multi-stage paint correction included',
      '2-5 year ceramic coating options',
      'Enhanced gloss & depth',
      'Superior UV protection',
      'Extreme hydrophobic properties',
      'Easier maintenance',
    ],
  },
  {
    icon: Paintbrush,
    title: 'Paint Correction',
    description: 'Multi-stage paint polishing to remove swirl marks, light scratches, oxidation, and restore clarity and depth to your vehicle\'s finish.',
    price: 'Starting at $399',
    details: [
      'Single-stage polish (70% defect removal)',
      'Two-stage correction (90%+ defect removal)',
      'Enhance paint clarity and gloss',
      'Removes swirl marks and light scratches',
      'Prepares paint for coating application',
      'Includes exterior detail',
    ],
  },
  {
    icon: Truck,
    title: 'Truck & SUV Detailing',
    description: 'Specialized detailing packages for larger vehicles, addressing their unique needs for thorough cleaning and protection.',
    price: 'Starting at $199',
    details: [
      'Enhanced exterior wash for larger surfaces',
      'Interior detailing scaled for more space',
      'Wheel well & undercarriage cleaning',
      'Heavy-duty stain removal options',
      'Suitable for all truck and SUV sizes',
    ],
  },
  {
    icon: Bike,
    title: 'Motorcycle Detailing',
    description: 'Dedicated detailing for motorcycles, ensuring every chrome piece shines and every surface is protected.',
    price: 'Starting at $99',
    details: [
      'Hand wash & decontamination',
      'Chrome polishing',
      'Leather/vinyl conditioning',
      'Engine & exhaust cleaning',
      'Paint protection sealant',
    ],
  },
  {
    icon: Sun,
    title: 'Headlight Restoration',
    description: 'Restore cloudy, yellowed headlights to their original clarity, improving visibility and aesthetics.',
    price: 'Starting at $75',
    details: [
      'Multi-stage wet sanding',
      'Polishing for crystal clear finish',
      'UV protective coating application',
      'Improves nighttime visibility',
      'Enhances vehicle appearance',
    ],
  },
];

const ServicesPage = () => {
  return (
    <div>
      <Helmet>
        <title>Our Services - Riotous Car Care</title>
        <meta name="description" content="Explore the full range of premium auto detailing and ceramic coating services offered by Riotous Car Care. From exterior to interior, we cover it all." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4 text-primary">Our Expertise, Your Shine</h1>
            <p className="text-xl text-gray-300">
              Discover our comprehensive range of detailing and protection services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-xl shadow-lg border border-gray-800 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-4 bg-primary/10 rounded-full inline-flex mb-6">
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-primary text-lg font-semibold mb-4">{service.price}</p>
                <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                <ul className="text-left text-gray-500 text-sm space-y-2 mb-6 w-full">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-4 w-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="mt-auto">
                  <Button className="bg-primary text-gray-900 hover:bg-primary/90">
                    Book Now
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MobileRigSection />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-primary">Ready to Transform Your Vehicle?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get in touch with us today for a custom quote or to schedule your service.
          </p>
          <Link to="/booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-gray-900 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-secondary/90 transition duration-300"
            >
              Book Your Service Now
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;